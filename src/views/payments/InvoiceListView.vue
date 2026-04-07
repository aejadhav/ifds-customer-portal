<template>
  <div class="page">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Invoices</h1>
        <p class="text-sm text-gray-500 mt-0.5">All your invoices and billing history</p>
      </div>
      <router-link to="/app/payments/pay" class="btn-primary text-sm px-5 py-2.5">Pay Now</router-link>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 flex-wrap">
      <button
        v-for="f in filters"
        :key="f.value"
        @click="activeFilter = f.value; loadInvoices()"
        class="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
        :class="activeFilter === f.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:border-blue-400'"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- Loading -->
    <div v-if="paymentsStore.loading" class="space-y-3">
      <div v-for="i in 5" :key="i" class="skeleton h-20"></div>
    </div>

    <!-- Empty state -->
    <div v-else-if="paymentsStore.allInvoices.length === 0" class="card text-center py-16">
      <div class="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">🧾</div>
      <p class="text-gray-500 font-medium">No invoices found</p>
      <p class="text-gray-400 text-sm mt-1">Invoices will appear here once orders are delivered.</p>
    </div>

    <!-- Invoice list -->
    <div v-else class="space-y-3">
      <div v-for="inv in paymentsStore.allInvoices" :key="inv.id" class="card">
        <div class="flex items-start justify-between gap-3">
          <div class="min-w-0">
            <p class="font-semibold text-gray-900">{{ inv.invoice_number }}</p>
            <p class="text-xs text-gray-500 mt-0.5">{{ inv.order_number ?? '—' }}</p>
          </div>
          <span class="badge shrink-0" :class="statusBadge(inv.status)">{{ formatStatus(inv.status) }}</span>
        </div>
        <div class="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
          <div>
            <p class="text-lg font-bold text-gray-900">₹{{ Number(inv.amount).toLocaleString('en-IN') }}</p>
            <p class="text-xs text-gray-400 mt-0.5">Due {{ formatDate(inv.due_date) }}</p>
          </div>
          <div class="flex items-center gap-2">
            <router-link
              v-if="['unpaid', 'partial', 'pending'].includes(inv.status)"
              :to="`/app/payments/pay?invoice=${inv.id}`"
              class="btn-primary text-xs px-4 py-2"
            >
              Pay
            </router-link>
            <span v-else-if="inv.status === 'paid'" class="text-green-600 text-sm font-medium flex items-center gap-1">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Paid
            </span>
            <button @click="downloadPdf(inv.id)" :disabled="downloading === inv.id"
                    class="text-xs px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" />
              </svg>
              {{ downloading === inv.id ? '…' : 'PDF' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="paymentsStore.allInvoicesMeta.last_page > 1" class="flex items-center justify-center gap-3">
      <button
        @click="page--; loadInvoices()"
        :disabled="page <= 1"
        class="text-sm px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-40"
      >
        ← Prev
      </button>
      <span class="text-sm text-gray-500">
        Page {{ paymentsStore.allInvoicesMeta.current_page }} of {{ paymentsStore.allInvoicesMeta.last_page }}
      </span>
      <button
        @click="page++; loadInvoices()"
        :disabled="page >= paymentsStore.allInvoicesMeta.last_page"
        class="text-sm px-3 py-1.5 rounded-lg border border-gray-300 disabled:opacity-40"
      >
        Next →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { usePaymentsStore } from '@/stores/payments'
import api from '@/services/api'

const paymentsStore = usePaymentsStore()
const page = ref(1)
const activeFilter = ref('')
const downloading = ref<number | null>(null)

async function downloadPdf(invoiceId: number) {
  downloading.value = invoiceId
  try {
    const response = await api.get(`/invoices/${invoiceId}/pdf`, { responseType: 'blob' })
    const url = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
    const a = document.createElement('a')
    a.href = url
    a.download = `invoice-${invoiceId}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  } catch {
    alert('Failed to download invoice PDF. Please try again.')
  } finally {
    downloading.value = null
  }
}

const filters = [
  { label: 'All', value: '' },
  { label: 'Unpaid', value: 'unpaid' },
  { label: 'Partial', value: 'partial' },
  { label: 'Paid', value: 'paid' },
]

function loadInvoices() {
  const params: Record<string, unknown> = { page: page.value }
  if (activeFilter.value) params.status = activeFilter.value
  paymentsStore.fetchAllInvoices(params)
}

function statusBadge(status: string) {
  const map: Record<string, string> = {
    paid: 'badge-green',
    partial: 'badge-yellow',
    unpaid: 'badge-red',
    pending: 'badge-red',
    overdue: 'badge-red',
  }
  return map[status] || 'badge-gray'
}

function formatStatus(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function formatDate(d: string) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(() => loadInvoices())
</script>
