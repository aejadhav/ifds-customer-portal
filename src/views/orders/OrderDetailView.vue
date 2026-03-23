<template>
  <div class="page">
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">Order Details</h1>
    </div>

    <div v-if="ordersStore.loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse h-24"></div>
    </div>

    <template v-else-if="order">
      <!-- Status Timeline -->
      <div class="card">
        <div class="flex items-center justify-between mb-4">
          <p class="font-semibold text-gray-900 text-sm">{{ order.order_number }}</p>
          <span class="badge" :class="statusBadge(order.status)">{{ formatStatus(order.status) }}</span>
        </div>

        <div class="relative space-y-4">
          <div v-for="step in timeline" :key="step.key" class="flex gap-3">
            <div class="flex flex-col items-center">
              <div class="w-4 h-4 rounded-full border-2 shrink-0 mt-0.5" :class="step.done ? 'bg-blue-600 border-blue-600' : 'border-gray-300'"></div>
              <div v-if="step.key !== 'delivered'" class="w-0.5 flex-1 mt-1" :class="step.done ? 'bg-blue-600' : 'bg-gray-200'"></div>
            </div>
            <div class="pb-4">
              <p class="text-sm font-medium" :class="step.done ? 'text-gray-900' : 'text-gray-400'">{{ step.label }}</p>
              <p v-if="step.time" class="text-xs text-gray-400">{{ step.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Info -->
      <div class="card space-y-3">
        <h2 class="font-semibold text-gray-900 text-sm">Order Info</h2>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-gray-500">Product</span>
            <span class="font-medium">{{ order.product }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Quantity</span>
            <span class="font-medium">{{ order.quantity.toLocaleString('en-IN') }} L</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Rate</span>
            <span class="font-medium">₹{{ order.rate_per_liter }}/L</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Total</span>
            <span class="font-bold text-gray-900">₹{{ order.total_amount.toLocaleString('en-IN') }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Payment</span>
            <span class="font-medium capitalize">{{ order.payment_mode }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-500">Location</span>
            <span class="font-medium text-right max-w-[60%]">{{ order.delivery_location }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useOrdersStore } from '@/stores/orders'

const route = useRoute()
const ordersStore = useOrdersStore()
const order = computed(() => ordersStore.currentOrder)

const statusOrder = ['pending', 'confirmed', 'scheduled', 'dispatched', 'in_transit', 'delivered']

const timeline = computed(() => {
  if (!order.value) return []
  const currentIdx = statusOrder.indexOf(order.value.status)
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

onMounted(() => ordersStore.fetchOrder(Number(route.params.id)))
</script>
