<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900">Orders</h1>
      <router-link to="/orders/new" class="btn-primary text-sm px-3 py-2">+ New</router-link>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="activeFilter = f.value; loadOrders()"
        class="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="activeFilter === f.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Orders list -->
    <div v-if="ordersStore.loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="card animate-pulse h-24"></div>
    </div>

    <div v-else-if="ordersStore.orders.length === 0" class="card text-center py-12">
      <p class="text-gray-400">No orders found</p>
    </div>

    <div v-else class="space-y-3">
      <router-link
        v-for="order in ordersStore.orders"
        :key="order.id"
        :to="`/orders/${order.id}`"
        class="card block"
      >
        <div class="flex items-start justify-between mb-2">
          <div>
            <p class="font-semibold text-gray-900 text-sm">{{ order.order_number }}</p>
            <p class="text-xs text-gray-500">{{ order.product }} · {{ order.quantity.toLocaleString('en-IN') }} L</p>
          </div>
          <span class="badge" :class="statusBadge(order.status)">{{ formatStatus(order.status) }}</span>
        </div>
        <div class="flex items-center justify-between text-xs text-gray-500">
          <span>📍 {{ order.delivery_location }}</span>
          <span class="font-semibold text-gray-900 text-sm">₹{{ order.total_amount.toLocaleString('en-IN') }}</span>
        </div>
        <p class="text-xs text-gray-400 mt-1">{{ formatDate(order.scheduled_date) }}</p>
      </router-link>
    </div>

    <!-- Pagination -->
    <div v-if="ordersStore.meta.last_page > 1" class="flex justify-center gap-2 pt-2">
      <button @click="page--; loadOrders()" :disabled="page === 1" class="btn-secondary text-sm px-3 py-1.5">Prev</button>
      <span class="text-sm text-gray-500 self-center">{{ page }} / {{ ordersStore.meta.last_page }}</span>
      <button @click="page++; loadOrders()" :disabled="page === ordersStore.meta.last_page" class="btn-secondary text-sm px-3 py-1.5">Next</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders'

const ordersStore = useOrdersStore()
const activeFilter = ref('all')
const page = ref(1)

const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'This Month', value: 'this_month' },
]

function loadOrders() {
  ordersStore.fetchOrders({
    status: activeFilter.value === 'all' ? undefined : activeFilter.value,
    page: page.value,
  })
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    confirmed: 'badge-blue', dispatched: 'badge-yellow', in_transit: 'badge-yellow',
    delivered: 'badge-green', pending: 'badge-gray', invoiced: 'badge-green',
  }
  return map[status] || 'badge-gray'
}

function formatStatus(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(loadOrders)
</script>
