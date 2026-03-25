<template>
  <div class="page">
    <!-- Page header -->
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">Order Details</h1>
    </div>

    <!-- Live update banner — always full width, above the grid -->
    <transition name="slide-down">
      <div v-if="liveUpdate" class="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
        <span class="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 animate-pulse"></span>
        <div>
          <p class="text-sm font-semibold text-blue-800">Live update</p>
          <p class="text-xs text-blue-600">{{ liveUpdate }}</p>
        </div>
        <button @click="liveUpdate = null" class="ml-auto text-blue-400 hover:text-blue-600">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>

    <!-- Loading skeleton -->
    <div v-if="ordersStore.loading" class="grid lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-3">
        <div v-for="i in 3" :key="i" class="card animate-pulse h-24"></div>
      </div>
      <div class="lg:col-span-1 space-y-3">
        <div class="card animate-pulse h-48"></div>
      </div>
    </div>

    <!-- Two-column layout once order is loaded -->
    <template v-else-if="order">
      <div class="grid lg:grid-cols-3 gap-6">

        <!-- Left col: status timeline -->
        <div class="lg:col-span-2 space-y-4">
          <div class="card">
            <div class="flex items-center justify-between mb-4">
              <p class="font-semibold text-gray-900 text-sm">{{ order.order_number }}</p>
              <div class="flex items-center gap-2">
                <span v-if="connected" class="w-2 h-2 rounded-full bg-green-400" title="Live updates active"></span>
                <span class="badge" :class="statusBadge(currentStatus)">{{ formatStatus(currentStatus) }}</span>
              </div>
            </div>
            <div class="relative space-y-4">
              <div v-for="step in timeline" :key="step.key" class="flex gap-3">
                <div class="flex flex-col items-center">
                  <div class="w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 transition-all duration-500"
                       :class="step.done ? 'bg-blue-600 border-blue-600' : 'border-gray-300'"></div>
                  <div v-if="step.key !== 'delivered'" class="w-0.5 flex-1 mt-1 transition-all duration-500"
                       :class="step.done ? 'bg-blue-600' : 'bg-gray-200'"></div>
                </div>
                <div class="pb-4">
                  <p class="text-sm font-medium" :class="step.done ? 'text-gray-900' : 'text-gray-400'">{{ step.label }}</p>
                  <p v-if="step.time" class="text-xs text-gray-400">{{ step.time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right col: order info + delivery info (sticky on desktop) -->
        <div class="lg:col-span-1 lg:sticky lg:top-24 lg:self-start space-y-4">
          <!-- Order Info -->
          <div class="card space-y-3">
            <h2 class="font-semibold text-gray-900 text-sm">Order Info</h2>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Product</span>
                <span class="font-medium">{{ order.product_name }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Quantity</span>
                <span class="font-medium">{{ Number(order.quantity_ordered).toLocaleString('en-IN') }} L</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Total</span>
                <span class="font-bold text-gray-900">₹{{ Number(order.total_amount).toLocaleString('en-IN') }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Payment Terms</span>
                <span class="font-medium capitalize">{{ order.payment_terms }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Channel</span>
                <span class="font-medium">{{ order.order_channel }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Delivery Date</span>
                <span class="font-medium">{{ order.requested_delivery_date ? new Date(order.requested_delivery_date).toLocaleDateString('en-IN', {day:'numeric',month:'short',year:'numeric'}) : '—' }}</span>
              </div>
            </div>
          </div>

          <!-- Live delivery info (shown when driver is dispatched) -->
          <div v-if="deliveryInfo" class="card border-l-4 border-blue-500">
            <h2 class="font-semibold text-gray-900 text-sm mb-3">Driver on the way</h2>
            <div class="space-y-2 text-sm">
              <div v-if="deliveryInfo.driver_name" class="flex justify-between">
                <span class="text-gray-500">Driver</span>
                <span class="font-medium">{{ deliveryInfo.driver_name }}</span>
              </div>
              <div v-if="deliveryInfo.vehicle_number" class="flex justify-between">
                <span class="text-gray-500">Vehicle</span>
                <span class="font-medium">{{ deliveryInfo.vehicle_number }}</span>
              </div>
              <div v-if="deliveryInfo.driver_phone" class="flex justify-between">
                <span class="text-gray-500">Contact</span>
                <a :href="`tel:${deliveryInfo.driver_phone}`" class="font-medium text-blue-600">
                  {{ deliveryInfo.driver_phone }}
                </a>
              </div>
              <div v-if="deliveryInfo.estimated_arrival" class="flex justify-between">
                <span class="text-gray-500">ETA</span>
                <span class="font-medium text-green-600">{{ deliveryInfo.estimated_arrival }}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdersStore } from '@/stores/orders'
import { useCustomerChannel, type DeliveryStatusEvent, type OrderStatusEvent } from '@/composables/useCustomerChannel'

const route = useRoute()
const ordersStore = useOrdersStore()
const order = computed(() => ordersStore.currentOrder)

// Real-time state
const liveUpdate = ref<string | null>(null)
const currentStatus = ref<string>('')
const deliveryInfo = ref<DeliveryStatusEvent | null>(null)

const { subscribe, connected } = useCustomerChannel()

const statusOrder = ['pending', 'confirmed', 'scheduled', 'dispatched', 'in_transit', 'delivered']

const timeline = computed(() => {
  if (!order.value) return []
  const status = currentStatus.value || order.value.status
  const currentIdx = statusOrder.indexOf(status)
  return [
    { key: 'confirmed', label: 'Order Confirmed', done: currentIdx >= 1, time: '' },
    { key: 'scheduled', label: 'Scheduled', done: currentIdx >= 2, time: '' },
    { key: 'dispatched', label: 'Dispatched', done: currentIdx >= 3, time: '' },
    { key: 'in_transit', label: 'In Transit', done: currentIdx >= 4, time: '' },
    { key: 'delivered', label: 'Delivered', done: currentIdx >= 5, time: '' },
  ]
})

function statusBadge(status: string) {
  const map: Record<string, string> = {
    confirmed: 'badge-blue', dispatched: 'badge-yellow', in_transit: 'badge-yellow', delivered: 'badge-green',
  }
  return map[status] || 'badge-gray'
}

function formatStatus(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function handleOrderUpdate(e: OrderStatusEvent) {
  // Only react to events for this specific order
  if (String(e.order_id) !== String(route.params.orderNumber)) return
  currentStatus.value = e.status
  liveUpdate.value = `Order is now ${formatStatus(e.status)}`
  setTimeout(() => { liveUpdate.value = null }, 8000)
}

function handleDeliveryUpdate(e: DeliveryStatusEvent) {
  if (String(e.order_id) !== String(route.params.orderNumber)) return
  deliveryInfo.value = e
  currentStatus.value = e.delivery_status === 'completed' ? 'delivered' : 'in_transit'
  liveUpdate.value = `Driver ${e.driver_name || ''} is on the way`
  setTimeout(() => { liveUpdate.value = null }, 10000)
}

watch(order, (o) => {
  if (o && !currentStatus.value) currentStatus.value = o.status
}, { immediate: true })

onMounted(() => {
  ordersStore.fetchOrder(route.params.orderNumber as string)
  subscribe(handleOrderUpdate, handleDeliveryUpdate)
})
</script>

<style scoped>
.slide-down-enter-active, .slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from, .slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
