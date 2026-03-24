<template>
  <div class="page">
    <h1 class="text-xl font-bold text-gray-900 pt-2">Support & Help</h1>

    <!-- Quick Contact -->
    <div class="card space-y-3">
      <h2 class="font-semibold text-sm text-gray-900">Contact Us</h2>
      <div class="grid grid-cols-3 gap-2">
        <a href="tel:+912012345678" class="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-blue-50 text-blue-700">
          <span class="text-xl">📞</span>
          <span class="text-xs font-medium">Call</span>
        </a>
        <a href="mailto:support@fuelflowpro.com" class="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-green-50 text-green-700">
          <span class="text-xl">📧</span>
          <span class="text-xs font-medium">Email</span>
        </a>
        <a href="https://wa.me/919876500000" class="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-emerald-50 text-emerald-700">
          <span class="text-xl">💬</span>
          <span class="text-xs font-medium">WhatsApp</span>
        </a>
      </div>
      <p class="text-xs text-gray-400 text-center">Mon–Sat: 9:00 AM – 6:00 PM</p>
    </div>

    <!-- Raise Ticket -->
    <div class="card space-y-4">
      <h2 class="font-semibold text-sm text-gray-900">Raise a Ticket</h2>
      <form @submit.prevent="submitTicket" class="space-y-3">
        <div>
          <label class="label">Category</label>
          <select v-model="ticket.category" class="input" required>
            <option value="">Select category</option>
            <option value="order_issue">Order Issue</option>
            <option value="payment">Payment</option>
            <option value="invoice">Invoice</option>
            <option value="delivery">Delivery</option>
            <option value="account">Account</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label class="label">Subject *</label>
          <input v-model="ticket.subject" class="input" placeholder="Brief description" required />
        </div>
        <div>
          <label class="label">Description *</label>
          <textarea v-model="ticket.description" class="input" rows="3" placeholder="Describe your issue in detail" required></textarea>
        </div>
        <div>
          <label class="label">Priority</label>
          <div class="flex gap-2">
            <button v-for="p in ['Low', 'Medium', 'High']" :key="p" type="button" @click="ticket.priority = p.toLowerCase()" class="flex-1 py-2 rounded-lg text-sm font-medium border-2 transition-colors" :class="ticket.priority === p.toLowerCase() ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'">
              {{ p }}
            </button>
          </div>
        </div>
        <p v-if="ticketSuccess" class="text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">Ticket submitted! We'll respond within 24 hours.</p>
        <button type="submit" :disabled="submitting" class="btn-primary w-full">
          {{ submitting ? 'Submitting...' : 'Submit Ticket' }}
        </button>
      </form>
    </div>

    <!-- FAQ -->
    <div class="card space-y-2">
      <h2 class="font-semibold text-sm text-gray-900 mb-1">Common Questions</h2>
      <div v-for="faq in faqs" :key="faq.q" class="border-b border-gray-100 last:border-0">
        <button @click="faq.open = !faq.open" class="w-full text-left py-3 flex justify-between items-center gap-2">
          <span class="text-sm text-gray-700">{{ faq.q }}</span>
          <svg class="w-4 h-4 text-gray-400 shrink-0 transition-transform" :class="faq.open ? 'rotate-180' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <p v-if="faq.open" class="text-xs text-gray-500 pb-3">{{ faq.a }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import api from '@/services/api'

const submitting = ref(false)
const ticketSuccess = ref(false)
const ticket = reactive({ category: '', subject: '', description: '', priority: 'medium' })

const faqs = reactive([
  { q: 'What is the minimum order quantity?', a: 'Minimum order is 5,000 liters per delivery.', open: false },
  { q: 'How is GST calculated?', a: 'GST @5% is applied on the base fuel amount.', open: false },
  { q: 'What payment modes are accepted?', a: 'UPI, Debit/Credit Card, Net Banking, and NEFT/RTGS.', open: false },
  { q: 'How do I track my delivery?', a: 'Go to Orders → select your order → Track Order to see live GPS.', open: false },
])

async function submitTicket() {
  submitting.value = true
  try {
    await api.post('/support/tickets', ticket)
    ticketSuccess.value = true
    Object.assign(ticket, { category: '', subject: '', description: '', priority: 'medium' })
  } catch {
    // show generic error
  } finally {
    submitting.value = false
  }
}
</script>
