<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-gray-900">Payments</h1>
      <router-link to="/payments/pay" class="btn-primary text-sm px-3 py-2">Pay Now</router-link>
    </div>

    <!-- Outstanding Summary -->
    <div class="card bg-gradient-to-br from-orange-500 to-red-500 text-white border-0" v-if="paymentsStore.invoices.length > 0">
      <p class="text-orange-100 text-xs mb-1">Total Outstanding</p>
      <p class="text-2xl font-bold">₹{{ totalOutstanding.toLocaleString('en-IN') }}</p>
      <p class="text-orange-100 text-xs mt-1">{{ paymentsStore.invoices.length }} invoice(s) pending</p>
      <router-link to="/payments/pay" class="mt-3 bg-white text-orange-600 text-sm font-semibold px-4 py-1.5 rounded-lg inline-block">
        Pay Now →
      </router-link>
    </div>

    <!-- Tabs -->
    <div class="flex rounded-xl bg-gray-100 p-1">
      <button @click="tab = 'outstanding'" class="flex-1 py-2 text-sm font-medium rounded-lg transition-colors" :class="tab === 'outstanding' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'">
        Outstanding
      </button>
      <button @click="tab = 'history'; loadHistory()" class="flex-1 py-2 text-sm font-medium rounded-lg transition-colors" :class="tab === 'history' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500'">
        History
      </button>
    </div>

    <!-- Outstanding Invoices -->
    <div v-if="tab === 'outstanding'">
      <div v-if="paymentsStore.loading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="card animate-pulse h-20"></div>
      </div>
      <div v-else-if="paymentsStore.invoices.length === 0" class="card text-center py-8">
        <p class="text-green-600 font-medium">✓ All clear! No outstanding invoices.</p>
      </div>
      <div v-else class="space-y-3">
        <div v-for="inv in paymentsStore.invoices" :key="inv.id" class="card">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-sm text-gray-900">{{ inv.invoice_number }}</p>
              <p class="text-xs text-gray-500">{{ inv.order_number }}</p>
            </div>
            <span class="badge badge-red">Due {{ formatDate(inv.due_date) }}</span>
          </div>
          <div class="flex items-center justify-between mt-2">
            <p class="text-lg font-bold text-gray-900">₹{{ inv.amount.toLocaleString('en-IN') }}</p>
            <router-link :to="`/payments/pay?invoice=${inv.id}`" class="btn-primary text-xs px-3 py-1.5">Pay</router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment History -->
    <div v-if="tab === 'history'" class="space-y-3">
      <div v-if="paymentsStore.loading" class="space-y-3">
        <div v-for="i in 3" :key="i" class="card animate-pulse h-16"></div>
      </div>
      <div v-else-if="paymentsStore.payments.length === 0" class="card text-center py-8">
        <p class="text-gray-400 text-sm">No payment history</p>
      </div>
      <div v-else>
        <div v-for="p in paymentsStore.payments" :key="p.id" class="card">
          <div class="flex items-start justify-between">
            <div>
              <p class="font-semibold text-sm text-gray-900">₹{{ p.amount.toLocaleString('en-IN') }}</p>
              <p class="text-xs text-gray-500">{{ p.transaction_id }} · {{ p.payment_mode }}</p>
            </div>
            <span class="badge badge-green">✓ Paid</span>
          </div>
          <p class="text-xs text-gray-400 mt-1">{{ formatDate(p.created_at) }}</p>
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
  paymentsStore.invoices.reduce((s: number, i: { amount: number }) => s + i.amount, 0),
)

function loadHistory() {
  paymentsStore.fetchPaymentHistory()
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

onMounted(() => paymentsStore.fetchOutstandingInvoices())
</script>
