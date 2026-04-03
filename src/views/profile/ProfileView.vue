<template>
  <div class="page">
    <h1 class="page-title">My Profile</h1>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left col: company summary card -->
      <div class="lg:col-span-1 space-y-4">
        <div class="gradient-blue">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-white/20 border border-white/30 rounded-2xl flex items-center justify-center text-white font-bold text-xl shrink-0" style="font-family: var(--font-heading)">
              {{ initials }}
            </div>
            <div>
              <p class="text-white font-bold text-lg" style="font-family: var(--font-heading)">{{ auth.customer?.company_name || auth.customer?.name }}</p>
              <p class="text-blue-200 text-sm">{{ auth.customer?.email || 'No email set' }}</p>
              <p class="text-blue-200 text-sm">+91 {{ auth.customer?.mobile }}</p>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-4">
            <div>
              <p class="text-blue-200 text-xs">GST Number</p>
              <p class="text-white text-sm font-semibold mt-0.5">{{ auth.customer?.gst_number || '—' }}</p>
            </div>
            <div>
              <p class="text-blue-200 text-xs">Account Status</p>
              <span class="inline-flex items-center gap-1 mt-0.5 text-sm font-semibold"
                :class="auth.customer?.status === 'active' ? 'text-green-300' : 'text-amber-300'">
                <span class="w-1.5 h-1.5 rounded-full"
                  :class="auth.customer?.status === 'active' ? 'bg-green-400' : 'bg-amber-400'"></span>
                {{ auth.customer?.status ? auth.customer.status.charAt(0).toUpperCase() + auth.customer.status.slice(1) : 'Pending' }}
              </span>
            </div>
          </div>
        </div>

        <!-- IFDS Sync status -->
        <div class="card">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              :class="auth.customer?.ifds_synced ? 'bg-green-50' : 'bg-amber-50'">
              <span class="text-lg">{{ auth.customer?.ifds_synced ? '✅' : '⏳' }}</span>
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900">IFDS Account</p>
              <p class="text-xs mt-0.5" :class="auth.customer?.ifds_synced ? 'text-green-600' : 'text-amber-600'">
                {{ auth.customer?.ifds_synced ? 'Synced & active' : 'Pending verification' }}
              </p>
            </div>
          </div>
          <p v-if="!auth.customer?.ifds_synced" class="text-xs text-gray-400 mt-3">
            Complete your profile details below to speed up verification.
          </p>
        </div>
      </div>

      <!-- Right col: edit form + menu + logout -->
      <div class="lg:col-span-2 space-y-4">

        <!-- Edit Profile Form -->
        <div class="card space-y-4">
          <h2 class="section-heading">Personal & Business Details</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="label">Full Name *</label>
              <input v-model="form.name" class="input" placeholder="Your full name" />
            </div>
            <div>
              <label class="label">Mobile Number</label>
              <input :value="auth.customer?.mobile" class="input bg-gray-50 cursor-not-allowed" disabled />
              <p class="text-xs text-gray-400 mt-1">Mobile cannot be changed</p>
            </div>
            <div>
              <label class="label">Email Address</label>
              <input v-model="form.email" type="email" class="input" placeholder="email@company.com" />
            </div>
            <div>
              <label class="label">Company Name</label>
              <input v-model="form.company_name" class="input" placeholder="ABC Industries Pvt Ltd" />
            </div>
            <div>
              <label class="label">GSTIN</label>
              <input v-model="form.gstin" class="input" placeholder="27AABCT1332L1ZN" maxlength="15" />
            </div>
          </div>

          <p v-if="saveError" class="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">{{ saveError }}</p>
          <p v-if="saveSuccess" class="text-sm text-green-700 bg-green-50 border border-green-100 rounded-xl px-4 py-3">✓ Profile updated successfully.</p>

          <div class="flex justify-end">
            <button @click="saveProfile" :disabled="saving" class="btn-primary">
              {{ saving ? 'Saving...' : 'Save Changes' }}
            </button>
          </div>
        </div>

        <!-- Navigation menu -->
        <div class="list-card">
          <router-link v-for="item in menuItems" :key="item.to" :to="item.to" class="list-item">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-lg" :class="item.bg">
              {{ item.icon }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-gray-900">{{ item.label }}</p>
              <p class="text-xs text-gray-400 mt-0.5">{{ item.desc }}</p>
            </div>
            <svg class="w-4 h-4 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </router-link>
        </div>

        <button @click="handleLogout" class="btn-danger w-full">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>

        <p class="text-center text-xs text-gray-300">FuelFlow Pro · Customer Portal v1.0</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/services/api'

const auth = useAuthStore()
const router = useRouter()

const saving = ref(false)
const saveError = ref('')
const saveSuccess = ref(false)

const form = reactive({
  name: '',
  email: '',
  company_name: '',
  gstin: '',
})

const initials = computed(() =>
  (auth.customer?.company_name || auth.customer?.name || 'FF')
    .split(' ').slice(0, 2).map((w: string) => w[0]).join('').toUpperCase()
)

const menuItems = [
  { icon: '📍', label: 'Delivery Locations', desc: 'Manage your delivery sites', to: '/app/profile/locations', bg: 'bg-blue-50' },
  { icon: '🔔', label: 'Notification Preferences', desc: 'Control how we reach you', to: '/app/profile/notifications', bg: 'bg-amber-50' },
  { icon: '🛟', label: 'Support & Help', desc: 'Get help or raise a ticket', to: '/app/support', bg: 'bg-green-50' },
]

async function saveProfile() {
  saving.value = true
  saveError.value = ''
  saveSuccess.value = false
  try {
    const { data } = await api.patch('/profile', {
      name:         form.name || undefined,
      email:        form.email || undefined,
      company_name: form.company_name || undefined,
      gstin:        form.gstin || undefined,
    })
    // Update local auth store and persist to localStorage
    if (auth.customer) {
      auth.customer.name         = data.data.name
      auth.customer.email        = data.data.email
      auth.customer.company_name = data.data.company_name
      auth.customer.gst_number   = data.data.gstin
      localStorage.setItem('customer_user', JSON.stringify(auth.customer))
    }
    saveSuccess.value = true
    setTimeout(() => { saveSuccess.value = false }, 4000)
  } catch (e: any) {
    const errors = e.response?.data?.errors
    saveError.value = errors
      ? Object.values(errors).flat().join(' ')
      : e.response?.data?.message || 'Failed to save profile.'
  } finally {
    saving.value = false
  }
}

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}

onMounted(() => {
  form.name         = auth.customer?.name || ''
  form.email        = auth.customer?.email || ''
  form.company_name = auth.customer?.company_name || ''
  form.gstin        = auth.customer?.gst_number || ''
})
</script>
