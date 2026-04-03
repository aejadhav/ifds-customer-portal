import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'
import { refreshEchoAuth, disconnectEcho } from '@/services/echo'

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
  const _savedUser = (() => { try { return JSON.parse(localStorage.getItem('customer_user') || 'null') } catch { return null } })()
  const customer = ref<CustomerProfile | null>(_savedUser)
  const loading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const availableCredit = computed(() =>
    customer.value ? customer.value.credit_limit - customer.value.credit_used : 0,
  )

  async function login(credentials: { mobile?: string; email?: string; password: string }) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/login-password', credentials)
      token.value = data.access_token
      customer.value = data.customer ?? data.user
      localStorage.setItem('customer_token', data.access_token)
      localStorage.setItem('customer_user', JSON.stringify(customer.value))
      disconnectEcho()
      refreshEchoAuth(data.access_token)
    } finally {
      loading.value = false
    }
  }

  async function loginWithOtp(mobile: string, otp: string) {
    loading.value = true
    try {
      const { data } = await api.post('/auth/verify-otp', { mobile, otp })
      token.value = data.access_token
      customer.value = normalise(data.customer ?? data.user)
      localStorage.setItem('customer_token', data.access_token)
      localStorage.setItem('customer_user', JSON.stringify(customer.value))
      disconnectEcho()
      refreshEchoAuth(data.access_token)
    } finally {
      loading.value = false
    }
  }

  async function fetchProfile() {
    const { data } = await api.get('/profile')
    customer.value = normalise(data.data ?? data.customer ?? data.user)
    localStorage.setItem('customer_user', JSON.stringify(customer.value))
  }

  // API returns `gstin`; store uses `gst_number` — normalise on the way in
  function normalise(raw: any): CustomerProfile {
    if (!raw) return raw
    return { ...raw, gst_number: raw.gst_number ?? raw.gstin ?? '' }
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
      localStorage.removeItem('customer_user')
      disconnectEcho()
    }
  }

  return { token, customer, loading, isAuthenticated, availableCredit, login, loginWithOtp, fetchProfile, logout }
})
