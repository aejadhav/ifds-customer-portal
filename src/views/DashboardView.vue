<template>
  <div class="p-4 space-y-4">
    <!-- Greeting -->
    <div class="pt-2">
      <h1 class="text-xl font-bold text-gray-900">Hello, {{ firstName }} 👋</h1>
      <p class="text-sm text-gray-500">{{ auth.customer?.company_name }}</p>
    </div>

    <!-- Credit Summary -->
    <div class="card bg-gradient-to-br from-blue-600 to-blue-700 text-white border-0">
      <p class="text-blue-100 text-xs font-medium uppercase tracking-wide mb-3">Account Overview</p>
      <div class="grid grid-cols-3 gap-3">
        <div>
          <p class="text-blue-200 text-xs">Credit Limit</p>
          <p class="text-lg font-bold">₹{{ shortAmount(auth.customer?.credit_limit) }}</p>
        </div>
        <div>
          <p class="text-blue-200 text-xs">Outstanding</p>
          <p class="text-lg font-bold">₹{{ shortAmount(auth.customer?.outstanding_balance) }}</p>
        </div>
        <div>
          <p class="text-blue-200 text-xs">Available</p>
          <p class="text-lg font-bold text-green-300">₹{{ shortAmount(auth.availableCredit) }}</p>
        </div>
      </div>
      <!-- Credit bar -->
      <div class="mt-3 h-1.5 bg-blue-500 rounded-full overflow-hidden">
        <div class="h-full bg-white rounded-full transition-all" :style="{ width: creditUsedPercent + '%' }"></div>
      </div>
      <p class="text-blue-200 text-xs mt-1">{{ creditUsedPercent }}% credit used</p>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-3 gap-3">
      <router-link to="/orders/new" class="card flex flex-col items-center gap-2 py-4 text-center hover:border-blue-200 transition-colors">
        <div class="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <span class="text-xs font-medium text-gray-700">New Order</span>
      </router-link>
      <router-link to="/payments/pay" class="card flex flex-col items-center gap-2 py-4 text-center hover:border-blue-200 transition-colors">
        <div class="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>
        <span class="text-xs font-medium text-gray-700">Pay Now</span>
      </router-link>
      <router-link to="/reports" class="card flex flex-col items-center gap-2 py-4 text-center hover:border-blue-200 transition-colors">
        <div class="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
          <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <span class="text-xs font-medium text-gray-700">Reports</span>
      </router-link>
    </div>

    <!-- Active Orders -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="font-semibold text-gray-900">Active Orders</h2>
        <router-link to="/orders" class="text-sm text-blue-600 font-medium">View all</router-link>
      </div>

      <div v-if="ordersStore.loading" class="space-y-3">
        <div v-for="i in 2" :key="i" class="card animate-pulse h-20"></div>
      </div>

      <div v-else-if="ordersStore.activeOrders.length === 0" class="card text-center py-8">
        <p class="text-gray-400 text-sm">No active orders</p>
        <router-link to="/orders/new" class="btn-primary mt-3 text-sm">Place Order</router-link>
      </div>

      <div v-else class="space-y-3">
        <router-link
          v-for="order in ordersStore.activeOrders"
          :key="order.id"
          :to="`/orders/${order.id}`"
          class="card block"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-gray-900 text-sm">{{ order.order_number }}</p>
              <p class="text-xs text-gray-500 mt-0.5">{{ order.quantity.toLocaleString('en-IN') }}L · {{ order.delivery_location }}</p>
            </div>
            <span class="badge" :class="statusBadge(order.status)">{{ order.status }}</span>
          </div>
          <div class="mt-2 flex items-center justify-between">
            <p class="text-xs text-gray-500">{{ order.scheduled_date }}</p>
            <p class="text-sm font-semibold text-gray-900">₹{{ order.total_amount.toLocaleString('en-IN') }}</p>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useOrdersStore } from '@/stores/orders'

const auth = useAuthStore()
const ordersStore = useOrdersStore()

const firstName = computed(() => auth.customer?.name?.split(' ')[0] || 'there')

const creditUsedPercent = computed(() => {
  if (!auth.customer) return 0
  return Math.round((auth.customer.credit_used / auth.customer.credit_limit) * 100)
})

function shortAmount(val?: number) {
  if (!val) return '0'
  if (val >= 100000) return (val / 100000).toFixed(1) + 'L'
  if (val >= 1000) return (val / 1000).toFixed(0) + 'K'
  return val.toString()
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    confirmed: 'badge-blue',
    dispatched: 'badge-yellow',
    in_transit: 'badge-yellow',
    delivered: 'badge-green',
    pending: 'badge-gray',
  }
  return map[status] || 'badge-gray'
}

onMounted(() => ordersStore.fetchActiveOrders())
</script>
