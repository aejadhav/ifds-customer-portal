import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export interface CustomerProfile {
  id: number
  name: string
  email: string
  mobile: string
  company_name: string
  gst_number: string
  credit_limit: number
  credit_used: number
  outstanding_balance: number
  status: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('customer_token'))
  const customer = ref<CustomerProfile | null>(null)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const availableCredit = computed(() =>
    customer.value ? customer.value.credit_limit - customer.value.credit_used : 0,
  )

  async function login(credentials: { mobile?: string; email?: string; password: string }) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/customer/login', credentials)
      token.value = data.token
      customer.value = data.customer
      localStorage.setItem('customer_token', data.token)
    } finally {
      loading.value = false
    }
  }

  async function loginWithOtp(mobile: string, otp: string) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/customer/verify-otp', { mobile, otp })
      token.value = data.token
      customer.value = data.customer
      localStorage.setItem('customer_token', data.token)
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    const { data } = await api.get('/customers/me')
    customer.value = data.data
  }

  async function logout() {
    try {
      await api.post('/auth/logout')
    } catch {
      // ignore
    } finally {
      token.value = null
      customer.value = null
      localStorage.removeItem('customer_token')
    }
  }

  return { token, customer, loading, isAuthenticated, availableCredit, login, loginWithOtp, fetchProfile, logout }
})
