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
  const allInvoices = ref<Invoice[]>([])
  const payments = ref<Payment[]>([])
  const loading = ref(false)
  const allInvoicesMeta = ref({ current_page: 1, last_page: 1, total: 0 })

  async function fetchOutstandingInvoices() {
    loading.value = true
    try {
      const { data } = await api.get('/invoices', { params: { status: 'pending' } })
      invoices.value = data.data ?? []
    } finally {
      loading.value = false
    }
  }

  async function fetchAllInvoices(params: Record<string, unknown> = {}) {
    loading.value = true
    try {
      const { data } = await api.get('/invoices', { params })
      allInvoices.value = data.data ?? []
      allInvoicesMeta.value = data.meta ?? { current_page: 1, last_page: 1, total: 0 }
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

  async function initiatePayment(payload: {
    amount: number
    payment_method: string
    payment_date: string
    transaction_id?: string
    upi_id?: string
    invoice_ids?: number[]
  }) {
    const { data } = await api.post('/payments', payload)
    return data
  }

  return { invoices, allInvoices, allInvoicesMeta, payments, loading, fetchOutstandingInvoices, fetchAllInvoices, fetchPaymentHistory, initiatePayment }
})
