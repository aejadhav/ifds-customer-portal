<template>
  <div class="min-h-screen bg-white p-6">
    <div class="flex items-center gap-3 mb-8">
      <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">Customer Registration</h1>
    </div>

    <div class="space-y-4">
      <div class="card bg-blue-50 border-blue-100">
        <p class="text-sm text-blue-700 font-medium">📋 Application Process</p>
        <p class="text-xs text-blue-600 mt-1">Submit your details and our team will verify & activate your account within 1–2 business days.</p>
      </div>

      <form @submit.prevent="submitRegistration" class="space-y-4">
        <div class="card space-y-4">
          <h2 class="font-semibold text-sm text-gray-900">Business Information</h2>
          <div>
            <label class="label">Company Name *</label>
            <input v-model="form.company_name" class="input" placeholder="ABC Industries Pvt Ltd" required />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="label">Business Type *</label>
              <select v-model="form.business_type" class="input" required>
                <option value="">Select</option>
                <option>Pvt Ltd</option>
                <option>LLP</option>
                <option>Partnership</option>
                <option>Proprietorship</option>
                <option>Others</option>
              </select>
            </div>
            <div>
              <label class="label">Industry *</label>
              <select v-model="form.industry" class="input" required>
                <option value="">Select</option>
                <option>Manufacturing</option>
                <option>Construction</option>
                <option>Agriculture</option>
                <option>Transport</option>
                <option>Others</option>
              </select>
            </div>
          </div>
          <div>
            <label class="label">GST Number *</label>
            <input v-model="form.gst_number" class="input" placeholder="27AABCT1332L1ZN" maxlength="15" required />
          </div>
          <div>
            <label class="label">PAN Number *</label>
            <input v-model="form.pan_number" class="input" placeholder="AABCT1332L" maxlength="10" required />
          </div>
        </div>

        <div class="card space-y-4">
          <h2 class="font-semibold text-sm text-gray-900">Contact Information</h2>
          <div>
            <label class="label">Contact Person *</label>
            <input v-model="form.contact_name" class="input" placeholder="Full Name" required />
          </div>
          <div>
            <label class="label">Mobile Number *</label>
            <input v-model="form.mobile" class="input" type="tel" placeholder="9876543210" maxlength="10" required />
          </div>
          <div>
            <label class="label">Email *</label>
            <input v-model="form.email" class="input" type="email" placeholder="email@company.com" required />
          </div>
        </div>

        <div class="card space-y-3">
          <h2 class="font-semibold text-sm text-gray-900">Fuel Requirements</h2>
          <div>
            <label class="label">Expected Monthly Consumption (L)</label>
            <input v-model.number="form.monthly_consumption" class="input" type="number" placeholder="50000" />
          </div>
          <div>
            <label class="label">Preferred Payment Mode</label>
            <select v-model="form.payment_mode" class="input">
              <option value="credit">Credit</option>
              <option value="prepaid">Prepaid</option>
              <option value="cod">COD</option>
            </select>
          </div>
        </div>

        <p v-if="error" class="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{{ error }}</p>
        <p v-if="submitted" class="text-sm text-green-600 bg-green-50 rounded-lg px-3 py-2">
          ✓ Application submitted! Reference: {{ refNumber }}. You'll hear from us in 1–2 business days.
        </p>

        <button v-if="!submitted" type="submit" :disabled="loading" class="btn-primary w-full py-3 text-base">
          {{ loading ? 'Submitting...' : 'Submit Application' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500">
        Already registered? <router-link to="/login" class="text-blue-600 font-medium">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import api from '@/services/api'

const loading = ref(false)
const error = ref('')
const submitted = ref(false)
const refNumber = ref('')

const form = reactive({
  company_name: '', business_type: '', industry: '', gst_number: '', pan_number: '',
  contact_name: '', mobile: '', email: '', monthly_consumption: 0, payment_mode: 'credit',
})

async function submitRegistration() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.post('/auth/customer/register', form)
    refNumber.value = data.reference_number
    submitted.value = true
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Registration failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
