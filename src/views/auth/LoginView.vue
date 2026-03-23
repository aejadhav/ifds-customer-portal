<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Header -->
    <div class="px-6 pt-12 pb-8 text-center">
      <div class="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
        </svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900">FuelFlow Pro</h1>
      <p class="text-gray-500 text-sm mt-1">Customer Portal</p>
    </div>

    <!-- Login Form -->
    <div class="flex-1 px-6">
      <!-- Tab toggle -->
      <div class="flex rounded-xl bg-gray-100 p-1 mb-6">
        <button @click="mode = 'password'" class="flex-1 py-2 text-sm font-medium rounded-lg transition-colors" :class="mode === 'password' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'">
          Password
        </button>
        <button @click="mode = 'otp'" class="flex-1 py-2 text-sm font-medium rounded-lg transition-colors" :class="mode === 'otp' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'">
          OTP Login
        </button>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Password mode -->
        <template v-if="mode === 'password'">
          <div>
            <label class="label">Mobile / Email</label>
            <input v-model="form.identifier" type="text" class="input" placeholder="9876543210 or email@company.com" required />
          </div>
          <div>
            <label class="label">Password</label>
            <input v-model="form.password" type="password" class="input" placeholder="••••••••" required />
          </div>
          <div class="text-right">
            <router-link to="/forgot-password" class="text-sm text-blue-600 font-medium">Forgot Password?</router-link>
          </div>
        </template>

        <!-- OTP mode -->
        <template v-else>
          <div>
            <label class="label">Mobile Number</label>
            <input v-model="form.mobile" type="tel" class="input" placeholder="9876543210" maxlength="10" required />
          </div>
          <div v-if="otpSent">
            <label class="label">Enter OTP</label>
            <input v-model="form.otp" type="text" class="input" placeholder="6-digit OTP" maxlength="6" required />
            <p class="text-xs text-gray-500 mt-1">OTP sent to +91 {{ form.mobile }}</p>
          </div>
          <button v-if="!otpSent" type="button" @click="sendOtp" :disabled="loading" class="btn-secondary w-full">
            {{ loading ? 'Sending...' : 'Send OTP' }}
          </button>
        </template>

        <p v-if="error" class="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{{ error }}</p>

        <button v-if="mode === 'password' || otpSent" type="submit" :disabled="loading" class="btn-primary w-full py-3 text-base">
          {{ loading ? 'Logging in...' : 'Login' }}
        </button>
      </form>

      <p class="text-center text-sm text-gray-500 mt-6">
        New customer?
        <router-link to="/register" class="text-blue-600 font-medium">Register here</router-link>
      </p>
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
      await auth.login({ [form.value.identifier.includes('@') ? 'email' : 'mobile']: form.value.identifier, password: form.value.password })
    } else {
      await auth.loginWithOtp(form.value.mobile, form.value.otp)
    }
    const redirect = (route.query.redirect as string) || '/'
    router.push(redirect)
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
