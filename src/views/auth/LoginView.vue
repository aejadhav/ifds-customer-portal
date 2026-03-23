<template>
  <div class="min-h-screen flex">

    <!-- Left panel — branding (desktop only) -->
    <div class="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden flex-col justify-between p-12"
         style="background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)">
      <!-- Background orbs -->
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full"></div>
      <div class="absolute top-1/2 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

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

      <!-- Hero Text -->
      <div class="relative space-y-6">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span class="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
          Bulk Fuel Delivery Management
        </div>
        <h1 class="text-4xl xl:text-5xl font-bold text-white leading-tight" style="font-family: var(--font-heading)">
          Manage your fuel<br/>
          <span class="text-blue-200">orders & deliveries</span>
        </h1>
        <p class="text-blue-100 text-lg leading-relaxed max-w-md">
          Place orders, track deliveries in real-time, manage payments, and access your account anytime — anywhere.
        </p>

        <!-- Feature list -->
        <div class="space-y-3">
          <div v-for="f in features" :key="f" class="flex items-center gap-3 text-blue-100 text-sm">
            <div class="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
              <svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            {{ f }}
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="relative grid grid-cols-3 gap-4">
        <div v-for="s in stats" :key="s.label" class="bg-white/10 border border-white/20 rounded-2xl p-4 text-center">
          <p class="text-2xl font-bold text-white" style="font-family: var(--font-heading)">{{ s.value }}</p>
          <p class="text-xs text-blue-200 mt-1">{{ s.label }}</p>
        </div>
      </div>
    </div>

    <!-- Right panel — login form -->
    <div class="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-16 bg-white">
      <!-- Mobile logo -->
      <div class="lg:hidden flex items-center gap-3 mb-10">
        <div class="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
          <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
          </svg>
        </div>
        <div>
          <p class="font-bold text-gray-900" style="font-family: var(--font-heading)">FuelFlow Pro</p>
          <p class="text-xs text-primary-600 font-medium">Customer Portal</p>
        </div>
      </div>

      <div class="w-full max-w-sm mx-auto lg:mx-0">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900" style="font-family: var(--font-heading)">Welcome back</h2>
          <p class="text-gray-500 mt-1 text-sm">Sign in to your customer account</p>
        </div>

        <!-- Tab toggle -->
        <div class="tab-group mb-6">
          <button @click="mode = 'password'" class="tab-item" :class="mode === 'password' ? 'tab-active' : 'tab-inactive'">Password</button>
          <button @click="mode = 'otp'" class="tab-item" :class="mode === 'otp' ? 'tab-active' : 'tab-inactive'">OTP Login</button>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <template v-if="mode === 'password'">
            <div>
              <label class="label">Mobile / Email</label>
              <input v-model="form.identifier" type="text" class="input" placeholder="9876543210 or email@company.com" required autofocus />
            </div>
            <div>
              <div class="flex items-center justify-between mb-1.5">
                <label class="label mb-0">Password</label>
                <router-link to="/forgot-password" class="text-xs text-primary-600 font-medium hover:underline">Forgot password?</router-link>
              </div>
              <input v-model="form.password" type="password" class="input" placeholder="••••••••" required />
            </div>
          </template>

          <template v-else>
            <div>
              <label class="label">Mobile Number</label>
              <div class="flex gap-2">
                <span class="input w-16 text-center text-gray-600 shrink-0 bg-gray-50">+91</span>
                <input v-model="form.mobile" type="tel" class="input flex-1" placeholder="9876543210" maxlength="10" required />
              </div>
            </div>
            <div v-if="otpSent">
              <label class="label">Enter OTP</label>
              <input v-model="form.otp" type="text" class="input tracking-widest text-center text-lg font-semibold" placeholder="• • • • • •" maxlength="6" required />
              <p class="text-xs text-gray-400 mt-1.5 text-center">Sent to +91 {{ form.mobile }}</p>
            </div>
            <button v-if="!otpSent" type="button" @click="sendOtp" :disabled="loading" class="btn-outline w-full">
              {{ loading ? 'Sending OTP...' : 'Send OTP' }}
            </button>
          </template>

          <div v-if="error" class="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-sm text-red-600">{{ error }}</p>
          </div>

          <button v-if="mode === 'password' || otpSent" type="submit" :disabled="loading" class="btn-primary w-full py-3 text-base">
            <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
            </svg>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>

        <p class="text-center text-sm text-gray-500 mt-6">
          New customer?
          <router-link to="/register" class="text-primary-600 font-semibold hover:underline">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const mode = ref<'password' | 'otp'>('password')
const loading = ref(false)
const error = ref('')
const otpSent = ref(false)
const form = ref({ identifier: '', password: '', mobile: '', otp: '' })

const features = [
  'Real-time order tracking with GPS',
  'Online payments — UPI, Card, NEFT',
  'Digital invoices & statements',
  'Multiple delivery location management',
]
const stats = [
  { value: '24/7', label: 'Account Access' },
  { value: '< 2s', label: 'Order Placement' },
  { value: '100%', label: 'Transparency' },
]

async function sendOtp() {
  loading.value = true
  error.value = ''
  try {
    await api.post('/auth/customer/send-otp', { mobile: form.value.mobile })
    otpSent.value = true
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Failed to send OTP'
  } finally {
    loading.value = false
  }
}

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    if (mode.value === 'password') {
      await auth.login({
        [form.value.identifier.includes('@') ? 'email' : 'mobile']: form.value.identifier,
        password: form.value.password,
      })
    } else {
      await auth.loginWithOtp(form.value.mobile, form.value.otp)
    }
    router.push((route.query.redirect as string) || '/')
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>
