<template>
  <div class="min-h-screen bg-gray-50 flex">

    <!-- ═══════════════════════════════════════
         DESKTOP SIDEBAR (lg+)
    ═══════════════════════════════════════ -->
    <aside class="hidden lg:flex flex-col w-64 bg-white border-r border-gray-100 fixed inset-y-0 z-30">
      <!-- Logo -->
      <div class="h-16 flex items-center gap-3 px-6 border-b border-gray-100">
        <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center shrink-0">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div>
          <p class="font-bold text-gray-900 text-sm leading-none" style="font-family: var(--font-heading)">FuelFlow Pro</p>
          <p class="text-xs text-primary-600 font-medium mt-0.5">Customer Portal</p>
        </div>
      </div>

      <!-- Customer Info -->
      <div class="px-4 py-4 border-b border-gray-100" v-if="auth.customer">
        <div class="flex items-center gap-3 bg-primary-50 rounded-xl px-3 py-3">
          <div class="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
            {{ initials }}
          </div>
          <div class="min-w-0">
            <p class="text-sm font-semibold text-gray-900 truncate">{{ auth.customer.company_name || auth.customer.name }}</p>
            <p class="text-xs text-primary-600 font-medium">Customer</p>
          </div>
        </div>
      </div>

      <!-- Nav Links -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <SidebarLink to="/app" :active="route.name === 'dashboard'" icon="home" label="Dashboard" />
        <SidebarLink to="/app/orders" :active="String(route.name).startsWith('orders')" icon="package" label="Orders" />
        <SidebarLink to="/app/payments" :active="String(route.name).startsWith('payments')" icon="credit-card" label="Payments" />
        <SidebarLink to="/app/invoices" :active="route.name === 'invoices'" icon="file-text" label="Invoices" />
        <SidebarLink to="/app/reports" :active="route.name === 'reports'" icon="bar-chart" label="Reports" />

        <div class="pt-4 pb-1 px-3">
          <p class="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account</p>
        </div>
        <SidebarLink to="/app/profile" :active="route.name === 'profile'" icon="user" label="My Profile" />
        <SidebarLink to="/app/profile/locations" :active="route.name === 'profile-locations'" icon="map-pin" label="Delivery Locations" />
        <SidebarLink to="/app/profile/notifications" :active="route.name === 'profile-notifications'" icon="bell" label="Notifications" />
        <SidebarLink to="/app/support" :active="route.name === 'support'" icon="help" label="Support" />
      </nav>

      <!-- Credit Widget + Logout -->
      <div class="px-4 pb-4 space-y-3">
        <!-- Credit bar -->
        <div class="card p-4 bg-gray-50 border-gray-100" v-if="auth.customer">
          <div class="flex justify-between text-xs mb-2">
            <span class="text-gray-500 font-medium">Credit Used</span>
            <span class="font-semibold text-gray-700">{{ creditUsedPercent }}%</span>
          </div>
          <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all" :class="creditUsedPercent > 80 ? 'bg-red-500' : 'bg-primary-600'" :style="{ width: creditUsedPercent + '%' }"></div>
          </div>
          <div class="flex justify-between mt-2 text-xs text-gray-500">
            <span>Available: <span class="text-green-600 font-semibold">₹{{ shortAmount(auth.availableCredit) }}</span></span>
            <span>Limit: ₹{{ shortAmount(auth.customer.credit_limit) }}</span>
          </div>
        </div>
        <button @click="handleLogout" class="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>

    <!-- ═══════════════════════════════════════
         MAIN CONTENT AREA
    ═══════════════════════════════════════ -->
    <div class="flex-1 flex flex-col lg:pl-64">

      <!-- Desktop Top Bar -->
      <header class="hidden lg:flex h-16 bg-white border-b border-gray-100 items-center justify-between px-6 sticky top-0 z-20">
        <!-- Page Title (via route meta or slot) -->
        <h1 class="text-lg font-semibold text-gray-900" style="font-family: var(--font-heading)">
          {{ pageTitle }}
        </h1>

        <div class="flex items-center gap-3">
          <!-- Outstanding badge -->
          <div v-if="(auth.customer?.outstanding_balance ?? 0) > 0" class="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-1.5">
            <span class="w-2 h-2 bg-red-500 rounded-full"></span>
            <span class="text-xs font-medium text-red-600">Outstanding: ₹{{ shortAmount(auth.customer?.outstanding_balance) }}</span>
            <router-link to="/app/payments/pay" class="text-xs font-semibold text-red-700 underline">Pay</router-link>
          </div>
          <!-- Notification Bell -->
          <NotificationBell />
          <!-- New Order CTA -->
          <router-link to="/app/orders/new" class="btn-primary text-sm px-4 py-2">
            + New Order
          </router-link>
        </div>
      </header>

      <!-- Mobile Top Bar -->
      <header class="lg:hidden bg-white border-b border-gray-100 sticky top-0 z-20">
        <div class="flex items-center justify-between h-14 px-4">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <span class="font-bold text-gray-900 text-sm" style="font-family: var(--font-heading)">FuelFlow Pro</span>
          </div>
          <div class="flex items-center gap-2">
            <NotificationBell v-if="auth.customer" />
            <div v-if="auth.customer" class="text-right">
              <p class="text-xs text-gray-400">Available Credit</p>
              <p class="text-sm font-bold text-green-600">₹{{ shortAmount(auth.availableCredit) }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="flex-1 pb-20 lg:pb-0">
        <router-view />
      </main>
    </div>

    <!-- ═══════════════════════════════════════
         MOBILE BOTTOM NAV
    ═══════════════════════════════════════ -->
    <nav class="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-100 z-30 safe-area-pb">
      <div class="flex">
        <MobileNavItem to="/app" icon="home" label="Home" :active="route.name === 'dashboard'" />
        <MobileNavItem to="/app/orders" icon="package" label="Orders" :active="String(route.name).startsWith('orders')" />
        <!-- FAB New Order -->
        <div class="flex flex-col items-center justify-center flex-1 py-2">
          <router-link to="/app/orders/new" class="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 -mt-5">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </router-link>
          <span class="text-xs font-medium text-primary-600 mt-1">Order</span>
        </div>
        <MobileNavItem to="/app/payments" icon="credit-card" label="Pay" :active="String(route.name).startsWith('payments')" />
        <MobileNavItem to="/app/profile" icon="user" label="Profile" :active="String(route.name).startsWith('profile') || route.name === 'support'" />
      </div>
    </nav>

    <!-- PWA Install Banner -->
    <PwaInstallBanner v-if="showInstallBanner" @dismiss="showInstallBanner = false" @install="installPwa" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import SidebarLink from '@/components/SidebarLink.vue'
import MobileNavItem from '@/components/MobileNavItem.vue'
import PwaInstallBanner from '@/components/PwaInstallBanner.vue'
import NotificationBell from '@/components/NotificationBell.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const showInstallBanner = ref(false)
let deferredPrompt: any = null

const initials = computed(() =>
  (auth.customer?.company_name || auth.customer?.name || 'FF')
    .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
)

const creditUsedPercent = computed(() => {
  if (!auth.customer || !auth.customer.credit_limit) return 0
  return Math.min(100, Math.round((auth.customer.credit_used / auth.customer.credit_limit) * 100))
})

const pageTitle = computed(() => {
  const map: Record<string, string> = {
    dashboard: 'Dashboard',
    orders: 'Orders',
    'orders-new': 'New Order',
    'orders-detail': 'Order Details',
    payments: 'Payments',
    'payments-pay': 'Make Payment',
    invoices: 'Invoices',
    reports: 'Reports',
    profile: 'My Profile',
    'profile-locations': 'Delivery Locations',
    'profile-notifications': 'Notifications',
    support: 'Support & Help',
  }
  return map[String(route.name)] || 'FuelFlow Pro'
})

function shortAmount(val?: number) {
  if (!val) return '0'
  if (val >= 10000000) return (val / 10000000).toFixed(1) + 'Cr'
  if (val >= 100000) return (val / 100000).toFixed(1) + 'L'
  if (val >= 1000) return (val / 1000).toFixed(0) + 'K'
  return val.toString()
}

async function handleLogout() {
  await auth.logout()
  router.push('/')
}

async function installPwa() {
  if (!deferredPrompt) return
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  if (outcome === 'accepted') showInstallBanner.value = false
  deferredPrompt = null
}

onMounted(async () => {
  if (!auth.customer) await auth.fetchProfile()
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallBanner.value = true
  })
})
</script>
