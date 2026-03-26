<template>
  <div class="min-h-screen flex">

    <!-- Left panel — branding (desktop only) -->
    <div class="hidden lg:flex lg:w-2/5 xl:w-1/3 relative overflow-hidden flex-col justify-between p-12"
         style="background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 50%, #2563eb 100%)">
      <div class="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full"></div>
      <div class="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full"></div>

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

      <div class="relative space-y-5">
        <div class="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold px-3 py-1.5 rounded-full">
          <span class="w-1.5 h-1.5 bg-blue-300 rounded-full"></span>
          Quick Registration
        </div>
        <h2 class="text-3xl font-bold text-white leading-snug" style="font-family: var(--font-heading)">
          Get started in<br/>under a minute
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

      <p class="relative text-blue-200 text-xs">No paperwork needed to get started</p>
    </div>

    <!-- Right panel -->
    <div class="flex-1 bg-gray-50 flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-16">
      <div class="w-full max-w-sm mx-auto">

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

        <!-- Step indicators -->
        <div class="flex items-center gap-2 mb-8">
          <div v-for="s in 3" :key="s" class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
              :class="step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-400'">
              <svg v-if="step > s" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span v-else>{{ s }}</span>
            </div>
            <div v-if="s < 3" class="w-8 h-0.5 transition-all" :class="step > s ? 'bg-primary-600' : 'bg-gray-200'"></div>
          </div>
        </div>

        <!-- Step 1: Mobile number -->
        <template v-if="step === 1">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: var(--font-heading)">Create account</h2>
            <p class="text-gray-500 mt-1 text-sm">Enter your mobile number to get started</p>
          </div>
          <form @submit.prevent="submitMobile" class="space-y-4">
            <div>
              <label class="label">Mobile Number</label>
              <div class="flex gap-2">
                <span class="input w-16 text-center text-gray-600 shrink-0 bg-gray-100 cursor-default">+91</span>
                <input v-model="mobile" type="tel" class="input flex-1" placeholder="9876543210" maxlength="10" required autofocus />
              </div>
            </div>
            <div v-if="error" class="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>
            <button type="submit" :disabled="loading || mobile.length !== 10" class="btn-primary w-full py-3">
              <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              {{ loading ? 'Please wait...' : 'Send OTP' }}
            </button>
          </form>
        </template>

        <!-- Step 2: Verify OTP -->
        <template v-if="step === 2">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: var(--font-heading)">Verify mobile</h2>
            <p class="text-gray-500 mt-1 text-sm">Enter the OTP sent to <span class="font-semibold text-gray-700">+91 {{ mobile }}</span></p>
          </div>
          <form @submit.prevent="verifyOtp" class="space-y-4">
            <div>
              <label class="label">One-Time Password</label>
              <input v-model="otp" type="text" inputmode="numeric" class="input tracking-widest text-center text-xl font-semibold" placeholder="• • • • • •" maxlength="6" required autofocus />
            </div>
            <div v-if="error" class="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              <svg class="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-sm text-red-600">{{ error }}</p>
            </div>
            <button type="submit" :disabled="loading || otp.length !== 6" class="btn-primary w-full py-3">
              <svg v-if="loading" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
              </svg>
              {{ loading ? 'Verifying...' : 'Verify & Continue' }}
            </button>
            <button type="button" @click="resendOtp" :disabled="resendCooldown > 0" class="w-full text-sm text-gray-500 hover:text-primary-600 transition-colors">
              {{ resendCooldown > 0 ? `Resend OTP in ${Math.floor(resendCooldown / 60)}:${String(resendCooldown % 60).padStart(2, '0')}` : 'Resend OTP' }}
            </button>
          </form>
        </template>

        <!-- Step 3: Success -->
        <template v-if="step === 3">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900" style="font-family: var(--font-heading)">You're in!</h2>
            <p class="text-gray-500 text-sm">Account created successfully. Redirecting to your dashboard...</p>
          </div>
        </template>

        <p v-if="step === 1" class="text-center text-sm text-gray-500 mt-6">
          Already have an account?
          <router-link to="/login" class="text-primary-600 font-semibold hover:underline">Sign in</router-link>
        </p>
        <button v-if="step === 2" type="button" @click="step = 1; error = ''" class="mt-4 w-full text-sm text-gray-400 hover:text-gray-600 transition-colors">
          ← Change number
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const router = useRouter()
const auth = useAuthStore()

const step = ref(1)
const mobile = ref('')
const otp = ref('')
const loading = ref(false)
const error = ref('')
const resendCooldown = ref(0)
let cooldownTimer: ReturnType<typeof setInterval> | null = null

const benefits = [
  'Register with just your mobile number',
  'Real-time order tracking with GPS',
  'Online payments — UPI, Card, NEFT',
  'Digital invoices & statements',
]

function startCooldown() {
  resendCooldown.value = 300
  cooldownTimer = setInterval(() => {
    resendCooldown.value--
    if (resendCooldown.value <= 0 && cooldownTimer) {
      clearInterval(cooldownTimer)
      cooldownTimer = null
    }
  }, 1000)
}

async function submitMobile() {
  loading.value = true
  error.value = ''
  try {
    // Register account (mobile only)
    await api.post('/auth/register', { mobile: mobile.value })
    // Send OTP
    await api.post('/auth/send-otp', { mobile: mobile.value })
    step.value = 2
    startCooldown()
  } catch (e: any) {
    const errors = e.response?.data?.errors
    if (errors) {
      error.value = Object.values(errors).flat().join(' ')
    } else {
      error.value = e.response?.data?.message || 'Something went wrong. Please try again.'
    }
  } finally {
    loading.value = false
  }
}

async function resendOtp() {
  loading.value = true
  error.value = ''
  try {
    await api.post('/auth/send-otp', { mobile: mobile.value })
    startCooldown()
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Failed to resend OTP.'
  } finally {
    loading.value = false
  }
}

async function verifyOtp() {
  loading.value = true
  error.value = ''
  try {
    await auth.loginWithOtp(mobile.value, otp.value)
    step.value = 3
    setTimeout(() => router.push('/app'), 1500)
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Invalid OTP. Please try again.'
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (cooldownTimer) clearInterval(cooldownTimer)
})
</script>
