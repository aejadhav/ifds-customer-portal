<template>
  <div class="min-h-screen flex">

    <!-- Left panel — branding (desktop only) -->
    <div class="hidden lg:flex lg:w-2/5 xl:w-1/3 relative overflow-hidden flex-col justify-between p-12"
         style="background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)">
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full"></div>

      <!-- Logo -->
      <div class="relative flex items-center gap-3">
        <div class="w-11 h-11 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div>
          <p class="text-white font-bold text-lg" style="font-family: var(--font-heading)">FuelFlow Pro</p>
          <span class="text-xs text-blue-200 font-medium">Customer Portal</span>
        </div>
      </div>

      <!-- Info -->
      <div class="relative space-y-5">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span class="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
          New Customer Registration
        </div>
        <h2 class="text-3xl font-bold text-white leading-snug" style="font-family: var(--font-heading)">
          Join thousands of<br/>businesses using<br/>
          <span class="text-blue-200">FuelFlow Pro</span>
        </h2>
        <div class="space-y-3">
          <div v-for="f in benefits" :key="f" class="flex items-center gap-3 text-blue-100 text-sm">
            <div class="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {{ f }}
          </div>
        </div>
      </div>

      <p class="relative text-blue-200 text-xs">Verified & activated within 1–2 business days</p>
    </div>

    <!-- Right panel — form -->
    <div class="flex-1 bg-gray-50 overflow-y-auto">
      <div class="max-w-2xl mx-auto px-6 py-10">

        <!-- Mobile logo -->
        <div class="lg:hidden flex items-center gap-3 mb-6">
          <div class="w-9 h-9 bg-primary-600 rounded-xl flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <div>
            <p class="font-bold text-gray-900 text-sm" style="font-family: var(--font-heading)">FuelFlow Pro</p>
            <p class="text-xs text-primary-600 font-medium">Customer Portal</p>
          </div>
        </div>

        <div class="flex items-center gap-3 mb-6">
          <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm lg:hidden">
            <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h1 class="text-2xl font-bold text-gray-900" style="font-family: var(--font-heading)">Customer Registration</h1>
            <p class="text-sm text-gray-500 mt-0.5">Fill in your business details to get started</p>
          </div>
        </div>

        <div class="space-y-4">
          <div class="card bg-blue-50 border-blue-100">
            <p class="text-sm text-blue-700 font-medium">📋 Application Process</p>
            <p class="text-xs text-blue-600 mt-1">Submit your details and our team will verify & activate your account within 1–2 business days.</p>
          </div>

          <form @submit.prevent="submitRegistration" class="space-y-4">
            <div class="card space-y-4">
              <h2 class="font-semibold text-gray-900">Business Information</h2>
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
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="label">GST Number *</label>
                  <input v-model="form.gst_number" class="input" placeholder="27AABCT1332L1ZN" maxlength="15" required />
                </div>
                <div>
                  <label class="label">PAN Number *</label>
                  <input v-model="form.pan_number" class="input" placeholder="AABCT1332L" maxlength="10" required />
                </div>
              </div>
            </div>

            <div class="card space-y-4">
              <h2 class="font-semibold text-gray-900">Contact Information</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label">Contact Person *</label>
                  <input v-model="form.contact_name" class="input" placeholder="Full Name" required />
                </div>
                <div>
                  <label class="label">Mobile Number *</label>
                  <input v-model="form.mobile" class="input" type="tel" placeholder="9876543210" maxlength="10" required />
                </div>
              </div>
              <div>
                <label class="label">Email *</label>
                <input v-model="form.email" class="input" type="email" placeholder="email@company.com" required />
              </div>
            </div>

            <div class="card space-y-4">
              <h2 class="font-semibold text-gray-900">Fuel Requirements</h2>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>

            <p v-if="error" class="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{{ error }}</p>
            <p v-if="submitted" class="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">
              ✓ Registration received! You will receive an OTP to verify your mobile number.
            </p>

            <button v-if="!submitted" type="submit" :disabled="loading" class="btn-primary w-full py-3 text-base">
              {{ loading ? 'Submitting...' : 'Submit Application' }}
            </button>
          </form>

          <p class="text-center text-sm text-gray-500 pb-4">
            Already registered? <router-link to="/login" class="text-primary-600 font-medium hover:underline">Sign in</router-link>
          </p>
        </div>
      </div>
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

const benefits = [
  'Real-time order tracking with GPS',
  'Online payments — UPI, Card, NEFT',
  'Digital invoices & statements',
  'Multiple delivery location management',
]

const form = reactive({
  company_name: '', business_type: '', industry: '', gst_number: '', pan_number: '',
  contact_name: '', mobile: '', email: '', monthly_consumption: 0, payment_mode: 'credit',
})

async function submitRegistration() {
  loading.value = true
  error.value = ''
  try {
    const { data } = await api.post('/auth/register', {
      name:         form.contact_name,
      mobile:       form.mobile,
      email:        form.email || undefined,
      company_name: form.company_name || undefined,
      gstin:        form.gst_number || undefined,
    })
    refNumber.value = data.customer_id
    submitted.value = true
  } catch (e: any) {
    const errors = e.response?.data?.errors
    if (errors) {
      error.value = Object.values(errors).flat().join(' ')
    } else {
      error.value = e.response?.data?.message || 'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>
