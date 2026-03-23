<template>
  <div class="page">
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">Delivery Locations</h1>
    </div>

    <div v-if="loading" class="space-y-3">
      <div v-for="i in 3" :key="i" class="card animate-pulse h-20"></div>
    </div>

    <div v-else class="space-y-3">
      <div v-for="loc in locations" :key="loc.id" class="card">
        <div class="flex items-start justify-between">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <p class="font-semibold text-sm text-gray-900">{{ loc.name }}</p>
              <span v-if="loc.is_default" class="badge badge-blue">Default</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">{{ loc.address }}</p>
            <p class="text-xs text-gray-400">{{ loc.contact_person }} · {{ loc.contact_mobile }}</p>
          </div>
        </div>
      </div>
    </div>

    <button @click="showAddForm = !showAddForm" class="btn-secondary w-full">
      {{ showAddForm ? '✕ Cancel' : '+ Add Location' }}
    </button>

    <form v-if="showAddForm" @submit.prevent="addLocation" class="card space-y-3">
      <h2 class="font-semibold text-sm text-gray-900">New Delivery Location</h2>
      <div>
        <label class="label">Location Name *</label>
        <input v-model="newLoc.name" class="input" placeholder="Main Factory" required />
      </div>
      <div>
        <label class="label">Full Address *</label>
        <textarea v-model="newLoc.address" class="input" rows="2" required></textarea>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="label">Contact Person</label>
          <input v-model="newLoc.contact_person" class="input" placeholder="Name" />
        </div>
        <div>
          <label class="label">Mobile</label>
          <input v-model="newLoc.contact_mobile" class="input" placeholder="9876543210" type="tel" />
        </div>
      </div>
      <div>
        <label class="label">Landmark</label>
        <input v-model="newLoc.landmark" class="input" placeholder="Near gate 2" />
      </div>
      <p v-if="formError" class="text-sm text-red-600">{{ formError }}</p>
      <button type="submit" :disabled="saving" class="btn-primary w-full">
        {{ saving ? 'Saving...' : 'Save Location' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api from '@/services/api'

const locations = ref<any[]>([])
const loading = ref(false)
const saving = ref(false)
const formError = ref('')
const showAddForm = ref(false)
const newLoc = ref({ name: '', address: '', contact_person: '', contact_mobile: '', landmark: '' })

async function loadLocations() {
  loading.value = true
  try {
    const { data } = await api.get('/customers/me/locations')
    locations.value = data.data || []
  } finally {
    loading.value = false
  }
}

async function addLocation() {
  saving.value = true
  formError.value = ''
  try {
    const { data } = await api.post('/customers/me/locations', newLoc.value)
    locations.value.push(data.data)
    showAddForm.value = false
    newLoc.value = { name: '', address: '', contact_person: '', contact_mobile: '', landmark: '' }
  } catch (e: any) {
    formError.value = e.response?.data?.message || 'Failed to add location'
  } finally {
    saving.value = false
  }
}

onMounted(loadLocations)
</script>
