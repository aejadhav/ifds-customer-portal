<template>
  <div class="page">
    <!-- Greeting -->
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm text-gray-500">Good {{ timeOfDay }},</p>
        <h1 class="page-title mt-0.5">{{ auth.customer?.company_name || auth.customer?.name || 'Welcome' }}</h1>
      </div>
      <div class="w-11 h-11 bg-primary-100 rounded-xl flex items-center justify-center text-primary-700 font-bold text-lg shrink-0" style="font-family: var(--font-heading)">
        {{ initials }}
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      <div class="gradient-blue col-span-2 lg:col-span-1 row-span-1">
        <p class="text-blue-200 text-xs font-medium uppercase tracking-wide">Credit Limit</p>
        <p class="text-2xl font-bold text-white mt-1" style="font-family: var(--font-heading)">₹{{ shortAmount(auth.customer?.credit_limit) }}</p>
        <div class="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div class="h-full bg-white rounded-full transition-all" :style="{ width: creditUsedPercent + '%' }"></div>
        </div>
        <p class="text-blue-200 text-xs mt-1">{{ creditUsedPercent }}% used</p>
      </div>

      <div class="stat-card">
        <p class="stat-label">Outstanding</p>
        <p class="stat-value text-red-600">₹{{ shortAmount(auth.customer?.outstanding_balance) }}</p>
        <router-link to="/payments/pay" class="text-xs text-primary-600 font-semibold mt-2 inline-block hover:underline">Pay now →</router-link>
      </div>

      <div class="stat-card">
        <p class="stat-label">Available</p>
        <p class="stat-value text-green-600">₹{{ shortAmount(auth.availableCredit) }}</p>
        <p class="text-xs text-gray-400 mt-2">Available credit</p>
      </div>

      <div class="stat-card">
        <p class="stat-label">This Month</p>
        <p class="stat-value">{{ monthlyOrders }}</p>
        <p class="text-xs text-gray-400 mt-2">Orders placed</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div>
      <h2 class="section-heading mb-3">Quick Actions</h2>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <router-link v-for="action in quickActions" :key="action.to" :to="action.to"
          class="card flex flex-col items-center gap-3 py-5 text-center hover:border-primary-200 hover:shadow-md transition-all group">
          <div class="w-12 h-12 rounded-2xl flex items-center justify-center transition-colors" :class="action.iconBg">
            <span class="text-2xl">{{ action.icon }}</span>
          </div>
          <span class="text-sm font-semibold text-gray-700 group-hover:text-primary-700">{{ action.label }}</span>
        </router-link>
      </div>
    </div>

    <!-- Active Orders -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h2 class="section-heading">Active Orders</h2>
        <router-link to="/orders" class="text-sm text-primary-600 font-semibold hover:underline">View all →</router-link>
      </div>

      <div v-if="ordersStore.loading" class="space-y-3">
        <div v-for="i in 2" :key="i" class="skeleton h-20"></div>
      </div>

      <div v-else-if="ordersStore.activeOrders.length === 0" class="card text-center py-12">
        <div class="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <span class="text-2xl">📦</span>
        </div>
        <p class="text-gray-500 text-sm font-medium">No active orders right now</p>
        <router-link to="/orders/new" class="btn-primary mt-4 text-sm">Place Your First Order</router-link>
      </div>

      <div v-else class="space-y-3">
        <router-link
          v-for="order in ordersStore.activeOrders"
          :key="order.id"
          :to="`/orders/${order.id}`"
          class="card-hover block"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-gray-900">{{ order.order_number }}</p>
              <p class="text-sm text-gray-500 mt-0.5">{{ order.quantity.toLocaleString('en-IN') }} L {{ order.product }} · {{ order.delivery_location }}</p>
            </div>
            <span class="badge" :class="statusBadge(order.status)">{{ formatStatus(order.status) }}</span>
          </div>
          <div class="mt-3 flex items-center justify-between text-sm">
            <span class="text-gray-400">📅 {{ formatDate(order.scheduled_date) }}</span>
            <span class="font-bold text-gray-900">₹{{ order.total_amount.toLocaleString('en-IN') }}</span>
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

const initials = computed(() =>
  (auth.customer?.company_name || auth.customer?.name || 'FF')
    .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
)

const creditUsedPercent = computed(() => {
  if (!auth.customer?.credit_limit) return 0
  return Math.min(100, Math.round((auth.customer.credit_used / auth.customer.credit_limit) * 100))
})

const timeOfDay = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'morning'
  if (h < 17) return 'afternoon'
  return 'evening'
})

const monthlyOrders = computed(() => ordersStore.activeOrders.length)

const quickActions = [
  { to: '/orders/new',    label: 'New Order',   icon: '⛽', iconBg: 'bg-blue-50' },
  { to: '/payments/pay',  label: 'Pay Bills',   icon: '💳', iconBg: 'bg-green-50' },
  { to: '/orders',        label: 'Track Order', icon: '🚛', iconBg: 'bg-amber-50' },
  { to: '/reports',       label: 'Reports',     icon: '📊', iconBg: 'bg-purple-50' },
]

function shortAmount(val?: number) {
  if (!val) return '0'
  if (val >= 10000000) return (val / 10000000).toFixed(1) + 'Cr'
  if (val >= 100000) return (val / 100000).toFixed(1) + 'L'
  if (val >= 1000) return (val / 1000).toFixed(0) + 'K'
  return val.toString()
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    confirmed: 'badge-blue', dispatched: 'badge-yellow', in_transit: 'badge-yellow',
    delivered: 'badge-green', pending: 'badge-gray',
  }
  return map[status] || 'badge-gray'
}

function formatStatus(s: string) {
  return s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(() => ordersStore.fetchActiveOrders())
</script>
