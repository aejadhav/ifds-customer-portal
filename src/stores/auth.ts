import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export interface CustomerProfile {
  id: string          // UUID from fuelflow_customer DB
  name: string
  email: string
  mobile: string
  company_name: string
  gst_number: string
  credit_limit: number
  credit_used: number
  outstanding_balance: number
  status: string
  ifds_synced: boolean
  ifds_customer_id: number | null
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
      const { data } = await api.post('/auth/login', credentials)
      token.value = data.access_token
      customer.value = data.user
      localStorage.setItem('customer_token', data.access_token)
    } finally {
      loading.value = false
    }
  }

  async function loginWithOtp(mobile: string, otp: string) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/verify-otp', { mobile, otp })
      token.value = data.access_token
      customer.value = data.user
      localStorage.setItem('customer_token', data.access_token)
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    // Uses /auth/me for now; swap to /customers/me once customer profile is linked
    const { data } = await api.get('/auth/me')
    customer.value = data.user
  }

  async function logout() {
    try {
      await api.post('/auth/logout') // same endpoint for all roles
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
