import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export interface ReportSummary {
  orders: number
  volume: number
  amount: number
  avg_rate: number
}

export interface MonthlyTrend {
  month: string
  orders: number
  volume: number
  amount: number
}

export interface LocationBreakdown {
  name: string
  orders: number
  volume: number
  amount: number
  percent: number
}

export interface PaymentSummary {
  total_invoices: number
  outstanding: number
  paid_amount: number
}

export interface ReportData {
  summary: ReportSummary
  monthly_trend: MonthlyTrend[]
  location_breakdown: LocationBreakdown[]
  payment_summary: PaymentSummary
  period: { from: string; to: string; label: string }
}

const emptyReport = (): ReportData => ({
  summary: { orders: 0, volume: 0, amount: 0, avg_rate: 0 },
  monthly_trend: [],
  location_breakdown: [],
  payment_summary: { total_invoices: 0, outstanding: 0, paid_amount: 0 },
  period: { from: '', to: '', label: '' },
})

export const useReportsStore = defineStore('reports', () => {
  const data = ref<ReportData>(emptyReport())
  const loading = ref(false)
  const error = ref('')

  async function fetchSummary(period = 'this_month') {
    loading.value = true
    error.value = ''
    try {
      const res = await api.get('/reports/summary', { params: { period } })
      data.value = res.data
    } catch {
      error.value = 'Failed to load report data.'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, fetchSummary }
})
