import { onMounted, onUnmounted, ref } from 'vue'
import { getEcho, disconnectEcho } from '@/services/echo'
import { useAuthStore } from '@/stores/auth'

export interface OrderStatusEvent {
  order_id: number
  order_number: string
  status: string
  sub_status: string | null
  payment_status: string
  delivery_status: string | null
  updated_at: string
}

export interface DeliveryStatusEvent {
  order_id: number
  order_number: string
  delivery_id: number
  delivery_status: string
  driver_name: string | null
  driver_phone: string | null
  vehicle_number: string | null
  estimated_arrival: string | null
  dispatched_at: string | null
}

export function useCustomerChannel() {
  const authStore = useAuthStore()
  const lastOrderEvent = ref<OrderStatusEvent | null>(null)
  const lastDeliveryEvent = ref<DeliveryStatusEvent | null>(null)
  const connected = ref(false)

  // Customer subscribes to their own private channel using the BFF UUID.
  // The BFF auth endpoint rewrites it to the ifds_customer_id before forwarding to Reverb.
  const channelName = `customer.${authStore.customer?.id}`

  let channel: ReturnType<ReturnType<typeof getEcho>['private']> | null = null

  function subscribe(
    onOrderUpdate?: (e: OrderStatusEvent) => void,
    onDeliveryUpdate?: (e: DeliveryStatusEvent) => void,
  ) {
    if (!authStore.customer?.ifds_synced) return

    const echo = getEcho()
    channel = echo.private(channelName)

    channel
      .listen('.order.status.updated', (e: OrderStatusEvent) => {
        lastOrderEvent.value = e
        onOrderUpdate?.(e)
      })
      .listen('.delivery.status.updated', (e: DeliveryStatusEvent) => {
        lastDeliveryEvent.value = e
        onDeliveryUpdate?.(e)
      })
      .subscribed(() => {
        connected.value = true
      })
      .error((err: unknown) => {
        console.warn('[Echo] channel error', err)
        connected.value = false
      })
  }

  function unsubscribe() {
    if (channel) {
      getEcho().leave(channelName)
      channel = null
      connected.value = false
    }
  }

  onUnmounted(() => {
    unsubscribe()
  })

  return {
    subscribe,
    unsubscribe,
    lastOrderEvent,
    lastDeliveryEvent,
    connected,
  }
}
