<template>
  <div class="page">
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">Make Payment</h1>
    </div>

    <div v-if="!success">
      <!-- Invoice Selection -->
      <div class="card space-y-3 mb-4">
        <h2 class="font-semibold text-gray-900 text-sm">Select Invoices</h2>
        <div v-for="inv in paymentsStore.invoices" :key="inv.id" @click="toggleInvoice(inv.id)" class="flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-colors" :class="selected.includes(inv.id) ? 'border-blue-600 bg-blue-50' : 'border-gray-200'">
          <div class="w-5 h-5 rounded border-2 flex items-center justify-center shrink-0" :class="selected.includes(inv.id) ? 'bg-blue-600 border-blue-600' : 'border-gray-300'">
            <svg v-if="selected.includes(inv.id)" class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-900">{{ inv.invoice_number }}</p>
            <p class="text-xs text-gray-500">Due {{ formatDate(inv.due_date) }}</p>
          </div>
          <p class="text-sm font-bold text-gray-900">₹{{ inv.amount.toLocaleString('en-IN') }}</p>
        </div>

        <div class="flex justify-between pt-2 border-t border-gray-100 text-sm font-bold">
          <span>Total</span>
          <span>₹{{ selectedTotal.toLocaleString('en-IN') }}</span>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="card space-y-3 mb-4">
        <h2 class="font-semibold text-gray-900 text-sm">Payment Method</h2>
        <div class="grid grid-cols-2 gap-2">
          <button v-for="m in methods" :key="m.value" type="button" @click="paymentMode = m.value" class="py-3 px-2 rounded-xl border-2 text-xs font-medium transition-colors text-center" :class="paymentMode === m.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'">
            {{ m.icon }} {{ m.label }}
          </button>
        </div>
      </div>

      <!-- UPI Detail -->
      <div v-if="paymentMode === 'upi'" class="card mb-4 text-center space-y-2">
        <p class="text-sm text-gray-600">Scan QR or use UPI ID</p>
        <div class="w-32 h-32 bg-gray-100 rounded-xl mx-auto flex items-center justify-center text-gray-400 text-xs">
          QR Code
        </div>
        <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
          <span class="text-sm text-gray-700 flex-1">fuelflow@icici</span>
          <button @click="copy('fuelflow@icici')" class="text-blue-600 text-xs font-medium">Copy</button>
        </div>
        <div>
          <label class="label text-left">Enter Transaction ID after payment</label>
          <input v-model="transactionId" class="input" placeholder="UPI Transaction ID" />
        </div>
      </div>

      <!-- NEFT detail -->
      <div v-if="paymentMode === 'neft'" class="card mb-4 space-y-2 text-sm">
        <p class="font-medium text-gray-900">Bank Details</p>
        <div class="space-y-1 text-gray-600">
          <p>Account: <span class="font-medium text-gray-900">FuelFlow Pro Pvt Ltd</span></p>
          <p>Bank: <span class="font-medium text-gray-900">ICICI Bank</span></p>
          <p>Account No: <span class="font-medium text-gray-900">1234 5678 9012</span></p>
          <p>IFSC: <span class="font-medium text-gray-900">ICIC0001234</span></p>
        </div>
        <div>
          <label class="label">Enter UTR / Transaction ID</label>
          <input v-model="transactionId" class="input" placeholder="UTR Number" />
        </div>
      </div>

      <p v-if="error" class="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2 mb-3">{{ error }}</p>

      <button @click="submitPayment" :disabled="selected.length === 0 || loading" class="btn-primary w-full py-3 text-base">
        {{ loading ? 'Processing...' : `Confirm Payment — ₹${selectedTotal.toLocaleString('en-IN')}` }}
      </button>
    </div>

    <!-- Success -->
    <div v-else class="card text-center py-10 space-y-3">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-gray-900">Payment Submitted!</h2>
      <p class="text-sm text-gray-500">Your payment is being processed. Receipt will be emailed shortly.</p>
      <router-link to="/payments" class="btn-primary inline-block text-sm mt-2">Done</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { usePaymentsStore } from '@/stores/payments'

const paymentsStore = usePaymentsStore()
const selected = ref<number[]>([])
const paymentMode = ref('upi')
const transactionId = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const methods = [
  { label: 'UPI', value: 'upi', icon: '📱' },
  { label: 'Debit/Credit Card', value: 'card', icon: '💳' },
  { label: 'Net Banking', value: 'netbanking', icon: '🏦' },
  { label: 'NEFT / RTGS', value: 'neft', icon: '🔄' },
]

const selectedTotal = computed(() =>
  paymentsStore.invoices.filter((i: { id: number }) => selected.value.includes(i.id)).reduce((s: number, i: { amount: number }) => s + i.amount, 0),
)

function toggleInvoice(id: number) {
  const idx = selected.value.indexOf(id)
  if (idx === -1) selected.value.push(id)
  else selected.value.splice(idx, 1)
}

async function submitPayment() {
  loading.value = true
  error.value = ''
  try {
    await paymentsStore.initiatePayment({
      invoice_ids: selected.value,
      payment_mode: paymentMode.value,
      transaction_id: transactionId.value || undefined,
    })
    success.value = true
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Payment failed. Please try again.'
  } finally {
    loading.value = false
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

function copy(text: string) {
  navigator.clipboard.writeText(text)
}

onMounted(() => paymentsStore.fetchOutstandingInvoices())
</script>
