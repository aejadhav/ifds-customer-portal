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

export interface NotificationPushedEvent {
  notification_id: string
  type: string
  title: string
  body: string | null
  data: Record<string, unknown>
  created_at: string
}

export function useCustomerChannel() {
  const authStore = useAuthStore()
  const lastOrderEvent = ref<OrderStatusEvent | null>(null)
  const lastDeliveryEvent = ref<DeliveryStatusEvent | null>(null)
  const connected = ref(false)

  // Customer subscribes using their IFDS integer ID — this matches the channel
  // the IFDS app broadcasts on (private-customer.{ifds_customer_id}).
  const channelName = `customer.${authStore.customer?.ifds_customer_id}`

  let channel: ReturnType<ReturnType<typeof getEcho>['private']> | null = null

  function subscribe(
    onOrderUpdate?: (e: OrderStatusEvent) => void,
    onDeliveryUpdate?: (e: DeliveryStatusEvent) => void,
    onNotification?: (e: NotificationPushedEvent) => void,
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
      .listen('.notification.pushed', (e: NotificationPushedEvent) => {
        onNotification?.(e)
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
