<template>
  <div class="page">
    <h1 class="page-title">My Profile</h1>

    <!-- Company Card -->
    <div class="gradient-blue">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0" style="font-family: var(--font-heading)">
          {{ initials }}
        </div>
        <div>
          <p class="text-white font-bold text-lg" style="font-family: var(--font-heading)">{{ auth.customer?.company_name || auth.customer?.name }}</p>
          <p class="text-blue-200 text-sm">{{ auth.customer?.email }}</p>
          <p class="text-blue-200 text-sm">{{ auth.customer?.mobile }}</p>
        </div>
      </div>
      <div class="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
        <div>
          <p class="text-blue-200 text-xs">GST Number</p>
          <p class="text-white text-sm font-semibold mt-0.5">{{ auth.customer?.gst_number || '—' }}</p>
        </div>
        <div>
          <p class="text-blue-200 text-xs">Account Status</p>
          <span class="inline-flex items-center gap-1 mt-0.5 text-green-300 text-sm font-semibold">
            <span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span> Active
          </span>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <div class="list-card">
      <router-link v-for="item in menuItems" :key="item.to" :to="item.to" class="list-item">
        <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg" :class="item.bg">
          {{ item.icon }}
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-semibold text-gray-900">{{ item.label }}</p>
          <p class="text-xs text-gray-400 mt-0.5">{{ item.desc }}</p>
        </div>
        <svg class="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <!-- Logout -->
    <button @click="handleLogout" class="btn-danger w-full">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Sign Out
    </button>

    <p class="text-center text-xs text-gray-300">FuelFlow Pro · Customer Portal v1.0</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const initials = computed(() =>
  (auth.customer?.company_name || auth.customer?.name || 'FF')
    .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
)

const menuItems = [
  { icon: '📍', label: 'Delivery Locations', desc: 'Manage your delivery sites', to: '/profile/locations', bg: 'bg-blue-50' },
  { icon: '🔔', label: 'Notification Preferences', desc: 'Control how we reach you', to: '/profile/notifications', bg: 'bg-amber-50' },
  { icon: '🛟', label: 'Support & Help', desc: 'Get help or raise a ticket', to: '/support', bg: 'bg-green-50' },
]

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>
