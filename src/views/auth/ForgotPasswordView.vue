<template>
  <div class="min-h-screen bg-gray-50 flex items-start justify-center py-12 px-4 sm:px-6">
    <div class="w-full max-w-md">
      <!-- Logo -->
      <div class="flex items-center gap-3 mb-8">
        <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm">
          <svg class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-xl font-bold text-gray-900">Reset Password</h1>
      </div>

      <div class="card space-y-4">
        <form @submit.prevent="handleReset" class="space-y-4" v-if="!done">
          <p class="text-sm text-gray-500">Enter your mobile number. We'll send an OTP to reset your password.</p>
          <div>
            <label class="label">Mobile Number</label>
            <input v-model="mobile" type="tel" class="input" placeholder="9876543210" maxlength="10" required />
          </div>
          <div v-if="otpSent">
            <label class="label">OTP</label>
            <input v-model="otp" type="text" class="input" placeholder="6-digit OTP" maxlength="6" required />
          </div>
          <div v-if="otpSent">
            <label class="label">New Password</label>
            <input v-model="password" type="password" class="input" placeholder="Min 8 characters" required />
          </div>
          <p v-if="error" class="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{{ error }}</p>
          <button type="submit" :disabled="loading" class="btn-primary w-full">
            {{ loading ? 'Please wait...' : otpSent ? 'Reset Password' : 'Send OTP' }}
          </button>
        </form>

        <div v-if="done" class="text-center py-8 space-y-3">
          <p class="text-green-600 text-lg font-bold">✓ Password Reset!</p>
          <router-link to="/login" class="btn-primary inline-block">Back to Login</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import api from '@/services/api'

const mobile = ref('')
const otp = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const otpSent = ref(false)
const done = ref(false)

async function handleReset() {
  loading.value = true
  error.value = ''
  try {
    if (!otpSent.value) {
      await api.post('/auth/forgot-password', { mobile: mobile.value })
      otpSent.value = true
    } else {
      await api.post('/auth/reset-password', { mobile: mobile.value, otp: otp.value, password: password.value })
      done.value = true
    }
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Something went wrong'
  } finally {
    loading.value = false
  }
}
</script>
