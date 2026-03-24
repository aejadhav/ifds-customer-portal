import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export interface Invoice {
  id: number
  invoice_number: string
  amount: number
  due_date: string
  status: string
  order_number: string
  created_at: string
}

export interface Payment {
  id: number
  transaction_id: string
  amount: number
  payment_mode: string
  status: string
  invoices: string[]
  created_at: string
}

export const usePaymentsStore = defineStore('payments', () => {
  const invoices = ref<Invoice[]>([])
  const payments = ref<Payment[]>([])
  const loading = ref(false)

  async function fetchOutstandingInvoices() {
    loading.value = true
    try {
      const { data } = await api.get('/invoices', { params: { status: 'unpaid' } })
      invoices.value = data.data
    } finally {
      loading.value = false
    }
  }

  async function fetchPaymentHistory() {
    loading.value = true
    try {
      const { data } = await api.get('/payments')
      payments.value = data.data
    } finally {
      loading.value = false
    }
  }

  async function initiatePayment(payload: { invoice_ids: number[]; payment_mode: string; transaction_id?: string }) {
    const { data } = await api.post('/payments', payload)
    return data.data
  }

  return { invoices, payments, loading, fetchOutstandingInvoices, fetchPaymentHistory, initiatePayment }
})
