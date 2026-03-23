<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold text-gray-900 pt-2">Profile</h1>

    <!-- Company Info -->
    <div class="card space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-700 font-bold text-lg">
          {{ initials }}
        </div>
        <div>
          <p class="font-semibold text-gray-900">{{ auth.customer?.company_name }}</p>
          <p class="text-sm text-gray-500">{{ auth.customer?.name }}</p>
        </div>
      </div>
      <div class="space-y-2 text-sm pt-2 border-t border-gray-100">
        <div class="flex justify-between">
          <span class="text-gray-500">GST Number</span>
          <span class="font-medium">{{ auth.customer?.gst_number || '—' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Mobile</span>
          <span class="font-medium">{{ auth.customer?.mobile }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-500">Email</span>
          <span class="font-medium truncate max-w-[60%] text-right">{{ auth.customer?.email }}</span>
        </div>
      </div>
    </div>

    <!-- Menu Items -->
    <div class="card divide-y divide-gray-100 p-0 overflow-hidden">
      <router-link v-for="item in menuItems" :key="item.to" :to="item.to" class="flex items-center gap-3 px-5 py-4 hover:bg-gray-50 transition-colors">
        <span class="text-xl">{{ item.icon }}</span>
        <span class="text-sm font-medium text-gray-700 flex-1">{{ item.label }}</span>
        <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </router-link>
    </div>

    <!-- Logout -->
    <button @click="handleLogout" class="btn-danger w-full">Logout</button>

    <p class="text-center text-xs text-gray-400">FuelFlow Pro v1.0</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const initials = computed(() =>
  auth.customer?.company_name?.split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase() || 'FF',
)

const menuItems = [
  { icon: '📍', label: 'Delivery Locations', to: '/profile/locations' },
  { icon: '🔔', label: 'Notification Preferences', to: '/profile/notifications' },
  { icon: '🛟', label: 'Support & Help', to: '/support' },
]

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>
