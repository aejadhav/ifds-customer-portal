import { ref, computed } from 'vue'
import api from '@/services/api'
import { useCustomerChannel, type NotificationPushedEvent } from './useCustomerChannel'

export interface Notification {
  id: string
  customer_id: string
  type: string
  title: string
  body: string | null
  data: Record<string, unknown> | null
  read_at: string | null
  created_at: string
}

const notifications = ref<Notification[]>([])
const unreadCount = ref(0)
const loading = ref(false)
let subscribed = false

export function useNotifications() {
  const { subscribe } = useCustomerChannel()

  const unread = computed(() => notifications.value.filter(n => !n.read_at))

  async function fetchUnreadCount() {
    try {
      const { data } = await api.get('/notifications/unread-count')
      unreadCount.value = data.unread_count
    } catch {
      // fail silently
    }
  }

  async function fetchRecent() {
    loading.value = true
    try {
      const { data } = await api.get('/notifications?per_page=20')
      notifications.value = data.data
      unreadCount.value = data.meta.unread_count
    } finally {
      loading.value = false
    }
  }

  async function markRead(id: string) {
    await api.post(`/notifications/${id}/read`)
    const n = notifications.value.find(n => n.id === id)
    if (n && !n.read_at) {
      n.read_at = new Date().toISOString()
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }
  }

  async function markAllRead() {
    await api.post('/notifications/read-all')
    notifications.value.forEach(n => { if (!n.read_at) n.read_at = new Date().toISOString() })
    unreadCount.value = 0
  }

  async function remove(id: string) {
    await api.delete(`/notifications/${id}`)
    const idx = notifications.value.findIndex(n => n.id === id)
    if (idx !== -1) {
      if (!notifications.value[idx].read_at) unreadCount.value = Math.max(0, unreadCount.value - 1)
      notifications.value.splice(idx, 1)
    }
  }

  // Subscribe once to real-time push
  function connectRealtime() {
    if (subscribed) return
    subscribed = true
    subscribe(
      undefined,  // no order handler here
      undefined,  // no delivery handler here
      (e: NotificationPushedEvent) => {
        // Prepend new notification
        notifications.value.unshift({
          id:          e.notification_id,
          customer_id: '',
          type:        e.type,
          title:       e.title,
          body:        e.body,
          data:        e.data,
          read_at:     null,
          created_at:  e.created_at,
        })
        unreadCount.value++
      },
    )
  }

  return {
    notifications,
    unread,
    unreadCount,
    loading,
    fetchUnreadCount,
    fetchRecent,
    markRead,
    markAllRead,
    remove,
    connectRealtime,
  }
}
