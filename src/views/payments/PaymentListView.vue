<template>
  <div class="page">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Payments</h1>
        <p class="text-sm text-gray-500 mt-0.5">Manage invoices and payment history</p>
      </div>
      <router-link to="/payments/pay" class="btn-primary text-sm px-5 py-2.5">Pay Now</router-link>
    </div>

    <!-- Outstanding Banner -->
    <div v-if="paymentsStore.invoices.length > 0" class="gradient-orange">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-orange-100 text-xs font-medium uppercase tracking-wide">Total Outstanding</p>
          <p class="text-3xl font-bold text-white mt-1" style="font-family: var(--font-heading)">₹{{ totalOutstanding.toLocaleString('en-IN') }}</p>
          <p class="text-orange-100 text-sm mt-1">{{ paymentsStore.invoices.length }} invoice(s) pending payment</p>
        </div>
        <router-link to="/payments/pay" class="bg-white text-orange-600 text-sm font-bold px-4 py-2 rounded-xl hover:bg-orange-50 transition-colors shrink-0">
          Pay Now
        </router-link>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tab-group">
      <button @click="tab = 'outstanding'" class="tab-item" :class="tab === 'outstanding' ? 'tab-active' : 'tab-inactive'">
        Outstanding <span v-if="paymentsStore.invoices.length" class="ml-1.5 bg-red-100 text-red-600 text-xs font-bold px-1.5 py-0.5 rounded-full">{{ paymentsStore.invoices.length }}</span>
      </button>
      <button @click="tab = 'history'; loadHistory()" class="tab-item" :class="tab === 'history' ? 'tab-active' : 'tab-inactive'">
        History
      </button>
    </div>

    <!-- Outstanding Invoices -->
    <div v-if="tab === 'outstanding'">
      <div v-if="paymentsStore.loading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="skeleton h-20"></div>
      </div>
      <div v-else-if="paymentsStore.invoices.length === 0" class="card text-center py-16">
        <div class="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl">✅</div>
        <p class="text-green-700 font-semibold">All clear!</p>
        <p class="text-gray-400 text-sm mt-1">No outstanding invoices</p>
      </div>
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div v-for="inv in paymentsStore.invoices" :key="inv.id" class="card">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-gray-900">{{ inv.invoice_number }}</p>
              <p class="text-sm text-gray-500 mt-0.5">{{ inv.order_number }}</p>
            </div>
            <span class="badge badge-red">Due {{ formatDate(inv.due_date) }}</span>
          </div>
          <div class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
            <p class="text-xl font-bold text-gray-900">₹{{ inv.amount.toLocaleString('en-IN') }}</p>
            <router-link :to="`/payments/pay?invoice=${inv.id}`" class="btn-primary text-xs px-4 py-2">Pay</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment History -->
    <div v-if="tab === 'history'">
      <div v-if="paymentsStore.loading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="skeleton h-16"></div>
      </div>
      <div v-else-if="paymentsStore.payments.length === 0" class="card text-center py-16">
        <p class="text-gray-400 text-sm">No payment history yet</p>
      </div>
      <div v-else class="space-y-3">
        <div v-for="p in paymentsStore.payments" :key="p.id" class="card flex items-center gap-4">
          <div class="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0 text-green-600">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-semibold text-gray-900">₹{{ p.amount.toLocaleString('en-IN') }}</p>
            <p class="text-xs text-gray-400 mt-0.5">{{ p.transaction_id }} · {{ p.payment_mode }}</p>
          </div>
          <div class="text-right shrink-0">
            <span class="badge badge-green">Paid</span>
            <p class="text-xs text-gray-400 mt-1">{{ formatDate(p.created_at) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePaymentsStore } from '@/stores/payments'

const paymentsStore = usePaymentsStore()
const tab = ref<'outstanding' | 'history'>('outstanding')

const totalOutstanding = computed(() =>
  paymentsStore.invoices.reduce((s: number, i: { amount: number }) => s + i.amount, 0)
)

function loadHistory() { paymentsStore.fetchPaymentHistory() }

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

onMounted(() => paymentsStore.fetchOutstandingInvoices())
</script>
