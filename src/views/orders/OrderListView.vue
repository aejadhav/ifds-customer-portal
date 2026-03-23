<template>
  <div class="page">
    <div class="flex items-center justify-between">
      <h1 class="page-title">Orders</h1>
      <router-link to="/orders/new" class="btn-primary text-sm">+ New Order</router-link>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
      <button v-for="f in filters" :key="f.value" @click="activeFilter = f.value; loadOrders()"
        class="filter-pill" :class="activeFilter === f.value ? 'filter-pill-active' : 'filter-pill-inactive'">
        {{ f.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="ordersStore.loading" class="space-y-3">
      <div v-for="i in 4" :key="i" class="skeleton h-24"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="ordersStore.orders.length === 0" class="card text-center py-16">
      <div class="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
        <span class="text-2xl">📦</span>
      </div>
      <p class="text-gray-500 font-medium">No orders found</p>
      <router-link to="/orders/new" class="btn-primary mt-4 text-sm inline-flex">Place Order</router-link>
    </div>

    <!-- Orders grid (2-col on large screens) -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-3">
      <router-link
        v-for="order in ordersStore.orders"
        :key="order.id"
        :to="`/orders/${order.id}`"
        class="card-hover block"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
            <p class="text-sm text-gray-500 mt-0.5">{{ order.product }} · {{ order.quantity.toLocaleString('en-IN') }} L</p>
          </div>
          <span class="badge" :class="statusBadge(order.status)">{{ formatStatus(order.status) }}</span>
        </div>
        <div class="flex items-center justify-between text-sm pt-3 border-t border-gray-100">
          <span class="text-gray-400">📍 {{ order.delivery_location }}</span>
          <span class="font-bold text-gray-900">₹{{ order.total_amount.toLocaleString('en-IN') }}</span>
        </div>
        <p class="text-xs text-gray-400 mt-2">{{ formatDate(order.scheduled_date) }}</p>
      </router-link>
    </div>

    <!-- Pagination -->
    <div v-if="ordersStore.meta.last_page > 1" class="flex justify-center items-center gap-3 pt-2">
      <button @click="page--; loadOrders()" :disabled="page === 1" class="btn-secondary text-sm px-4 py-2">← Prev</button>
      <span class="text-sm text-gray-500 font-medium">{{ page }} / {{ ordersStore.meta.last_page }}</span>
      <button @click="page++; loadOrders()" :disabled="page === ordersStore.meta.last_page" class="btn-secondary text-sm px-4 py-2">Next →</button>
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
  { label: 'All Orders', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'This Month', value: 'this_month' },
]

function loadOrders() {
  ordersStore.fetchOrders({ status: activeFilter.value === 'all' ? undefined : activeFilter.value, page: page.value })
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
