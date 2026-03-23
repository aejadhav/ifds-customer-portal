<template>
  <div class="relative" ref="bellRef">
    <!-- Bell Button -->
    <button
      @click="toggle"
      class="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
      aria-label="Notifications"
    >
      <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
      <!-- Unread badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none"
      >
        {{ unreadCount > 99 ? '99+' : unreadCount }}
      </span>
      <!-- Pulse dot for brand-new notification -->
      <span v-if="hasNew" class="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
    </button>

    <!-- Dropdown panel -->
    <transition name="dropdown">
      <div
        v-if="open"
        class="absolute right-0 top-11 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <p class="font-semibold text-gray-900 text-sm">Notifications</p>
          <button
            v-if="unreadCount > 0"
            @click="handleMarkAll"
            class="text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            Mark all read
          </button>
        </div>

        <!-- List -->
        <div class="max-h-96 overflow-y-auto divide-y divide-gray-50">
          <div v-if="loading" class="p-4 space-y-3">
            <div v-for="i in 3" :key="i" class="animate-pulse flex gap-3">
              <div class="w-8 h-8 bg-gray-200 rounded-lg shrink-0"></div>
              <div class="flex-1 space-y-1.5">
                <div class="h-3 bg-gray-200 rounded w-3/4"></div>
                <div class="h-2.5 bg-gray-100 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <template v-else-if="notifications.length">
            <div
              v-for="n in notifications"
              :key="n.id"
              @click="handleRead(n)"
              class="flex gap-3 px-4 py-3 cursor-pointer transition-colors"
              :class="n.read_at ? 'hover:bg-gray-50' : 'bg-blue-50 hover:bg-blue-100'"
            >
              <!-- Icon by type -->
              <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                   :class="typeColor(n.type)">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="typeIcon(n.type)" />
                </svg>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">{{ n.title }}</p>
                <p v-if="n.body" class="text-xs text-gray-500 mt-0.5 line-clamp-2">{{ n.body }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ timeAgo(n.created_at) }}</p>
              </div>
              <div v-if="!n.read_at" class="w-2 h-2 bg-blue-500 rounded-full mt-1.5 shrink-0"></div>
            </div>
          </template>

          <div v-else class="py-10 text-center">
            <svg class="w-10 h-10 text-gray-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p class="text-sm text-gray-400">No notifications yet</p>
          </div>
        </div>

        <!-- Footer -->
        <div v-if="notifications.length" class="border-t border-gray-100 px-4 py-2.5 text-center">
          <router-link
            to="/app/profile/notifications"
            @click="open = false"
            class="text-xs font-medium text-primary-600 hover:text-primary-700"
          >
            View all notifications
          </router-link>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useNotifications } from '@/composables/useNotifications'
import type { Notification } from '@/composables/useNotifications'

const { notifications, unreadCount, loading, fetchRecent, markRead, markAllRead, connectRealtime } = useNotifications()

const open = ref(false)
const hasNew = ref(false)
const bellRef = ref<HTMLElement | null>(null)

// Pulse the dot briefly on new notification
watch(unreadCount, (n, o) => { if (n > o) { hasNew.value = true; setTimeout(() => { hasNew.value = false }, 3000) } })

function toggle() {
  open.value = !open.value
  if (open.value && notifications.value.length === 0) fetchRecent()
}

function handleRead(n: Notification) {
  if (!n.read_at) markRead(n.id)
  // Navigate if notification has a link in data
  const link = n.data?.link as string | undefined
  if (link) { open.value = false; window.location.href = link }
}

async function handleMarkAll() {
  await markAllRead()
}

function typeColor(type: string) {
  const map: Record<string, string> = {
    order_confirmed: 'bg-blue-100 text-blue-600',
    order_delivered: 'bg-green-100 text-green-600',
    payment_received: 'bg-green-100 text-green-600',
    invoice_due: 'bg-red-100 text-red-600',
    delivery_dispatched: 'bg-yellow-100 text-yellow-600',
  }
  return map[type] || 'bg-gray-100 text-gray-500'
}

function typeIcon(type: string) {
  if (type.startsWith('order')) return 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10'
  if (type.startsWith('payment') || type.includes('invoice')) return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z'
  if (type.startsWith('delivery')) return 'M8 17a5 5 0 01-.916-9.916 5.002 5.002 0 019.832 0A5.002 5.002 0 0116 17m-7-5l3-3m0 0l3 3m-3-3v12'
  return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
}

function timeAgo(iso: string) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

// Close on outside click
function onClickOutside(e: MouseEvent) {
  if (bellRef.value && !bellRef.value.contains(e.target as Node)) open.value = false
}

onMounted(() => {
  connectRealtime()
  document.addEventListener('click', onClickOutside)
})
onUnmounted(() => document.removeEventListener('click', onClickOutside))
</script>

<style scoped>
.dropdown-enter-active, .dropdown-leave-active { transition: all 0.15s ease; }
.dropdown-enter-from, .dropdown-leave-to { opacity: 0; transform: translateY(-6px) scale(0.97); }
</style>
