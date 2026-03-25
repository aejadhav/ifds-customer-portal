import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export interface Order {
  id: number
  order_number: string
  product: string
  product_name: string
  quantity: number
  quantity_ordered: number
  status: string
  delivery_location: string
  scheduled_date: string
  requested_delivery_date: string | null
  total_amount: number
  rate_per_liter: number
  payment_mode: string
  payment_terms: string
  order_channel: string
  created_at: string
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])
  const activeOrders = ref<Order[]>([])
  const currentOrder = ref<Order | null>(null)
  const loading = ref(false)
  const meta = ref({ current_page: 1, last_page: 1, total: 0 })

  async function fetchOrders(params: Record<string, unknown> = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/orders', { params })
      orders.value = data.data
      meta.value = data.meta
    } finally {
      loading.value = false
    }
  }

  async function fetchActiveOrders() {
    const { data } = await api.get('/orders', {
      params: { status: 'active' },
    })
    activeOrders.value = data.data
  }

  async function fetchOrder(orderNumber: string) {
    loading.value = true
    try {
      const { data } = await api.get(`/orders/${orderNumber}`)
      currentOrder.value = data.data
    } finally {
      loading.value = false
    }
  }

  async function placeOrder(payload: {
    product: string
    delivery_location_id: string
    quantity: number
    preferred_date: string
    preferred_time: string
    payment_mode: string
    special_instructions?: string
  }) {
    const { data } = await api.post('/orders', payload)
    return data.data
  }

  return { orders, activeOrders, currentOrder, loading, meta, fetchOrders, fetchActiveOrders, fetchOrder, placeOrder }
})
