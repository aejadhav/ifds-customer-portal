<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Top Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div class="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <span class="font-bold text-gray-900">FuelFlow</span>
        </div>

        <!-- Credit display -->
        <div v-if="auth.customer" class="text-right">
          <p class="text-xs text-gray-500">Available Credit</p>
          <p class="text-sm font-semibold text-green-600">₹{{ formatAmount(auth.availableCredit) }}</p>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <main class="flex-1 max-w-lg mx-auto w-full pb-20">
      <router-view />
    </main>

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 z-40">
      <div class="max-w-lg mx-auto flex">
        <NavItem to="/" icon="home" label="Home" :active="route.name === 'dashboard'" />
        <NavItem to="/orders" icon="package" label="Orders" :active="String(route.name).startsWith('orders')" />
        <NavItem to="/payments" icon="credit-card" label="Payments" :active="String(route.name).startsWith('payments')" />
        <NavItem to="/reports" icon="bar-chart" label="Reports" :active="route.name === 'reports'" />
        <NavItem to="/profile" icon="user" label="Profile" :active="String(route.name).startsWith('profile')" />
      </div>
    </nav>

    <!-- PWA Install Banner -->
    <PwaInstallBanner v-if="showInstallBanner" @dismiss="showInstallBanner = false" @install="installPwa" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import NavItem from '@/components/NavItem.vue'
import PwaInstallBanner from '@/components/PwaInstallBanner.vue'

const route = useRoute()
const auth = useAuthStore()

const showInstallBanner = ref(false)
let deferredPrompt: any = null

onMounted(async () => {
  if (!auth.customer) await auth.fetchProfile()

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault()
    deferredPrompt = e
    showInstallBanner.value = true
  })
})

async function installPwa() {
  if (!deferredPrompt) return
  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice
  if (outcome === 'accepted') showInstallBanner.value = false
  deferredPrompt = null
}

function formatAmount(val: number) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val)
}
</script>
