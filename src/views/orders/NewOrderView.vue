<template>
  <div class="page">
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">New Order</h1>
    </div>

    <form @submit.prevent="submitOrder" class="space-y-4" v-if="!success">
      <!-- Product -->
      <div class="card space-y-3">
        <h2 class="font-semibold text-gray-900 text-sm">Product</h2>
        <div class="grid grid-cols-2 gap-2">
          <button type="button" @click="form.product = 'HSD'" class="py-3 rounded-xl border-2 text-sm font-medium transition-colors" :class="form.product === 'HSD' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'">
            ⛽ High Speed Diesel
          </button>
          <button type="button" @click="form.product = 'Petrol'" class="py-3 rounded-xl border-2 text-sm font-medium transition-colors" :class="form.product === 'Petrol' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'">
            🛢 Petrol
          </button>
        </div>
      </div>

      <!-- Location & Quantity -->
      <div class="card space-y-4">
        <div>
          <label class="label">Delivery Location *</label>
          <select v-model="form.delivery_location_id" class="input">
            <option value="">Select location</option>
            <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }} — {{ loc.address }}</option>
          </select>
        </div>

        <div>
          <label class="label">Quantity (Liters) *</label>
          <input v-model.number="form.quantity" type="number" class="input" placeholder="10000" min="1000" step="500" />
          <p class="text-xs text-gray-400 mt-1">Max: 999,999 L</p>
        </div>
      </div>

      <!-- Schedule -->
      <div class="card space-y-4">
        <h2 class="font-semibold text-gray-900 text-sm">Preferred Delivery</h2>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="label">Date *</label>
            <input v-model="form.preferred_date" type="date" class="input" :min="minDate" />
          </div>
          <div>
            <label class="label">Time *</label>
            <select v-model="form.preferred_time" class="input">
              <option value="08:00">8:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
            </select>
          </div>
        </div>
        <div>
          <label class="label">Special Instructions</label>
          <textarea v-model="form.special_instructions" class="input" rows="2" placeholder="Gate access, contact person, etc."></textarea>
        </div>
      </div>

      <!-- Payment -->
      <div class="card space-y-3">
        <h2 class="font-semibold text-gray-900 text-sm">Payment Mode</h2>
        <div class="grid grid-cols-2 gap-2">
          <button type="button" @click="form.payment_mode = 'credit'" class="py-3 rounded-xl border-2 text-sm font-medium transition-colors" :class="form.payment_mode === 'credit' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'">
            💳 Credit
          </button>
          <button type="button" @click="form.payment_mode = 'prepaid'" class="py-3 rounded-xl border-2 text-sm font-medium transition-colors" :class="form.payment_mode === 'prepaid' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600'">
            🔄 Prepaid
          </button>
        </div>
      </div>

      <!-- Order Summary -->
      <div v-if="form.quantity" class="card bg-gray-50 border-gray-200">
        <h2 class="font-semibold text-gray-900 text-sm mb-3">Order Summary</h2>
        <div class="space-y-1.5 text-sm">
          <div class="flex justify-between text-gray-600">
            <span>{{ form.quantity.toLocaleString('en-IN') }} L × ₹{{ ratePerLiter }}</span>
            <span>₹{{ subtotal.toLocaleString('en-IN') }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>GST @5%</span>
            <span>₹{{ gst.toLocaleString('en-IN') }}</span>
          </div>
          <div class="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200">
            <span>Total</span>
            <span>₹{{ total.toLocaleString('en-IN') }}</span>
          </div>
        </div>
      </div>

      <p v-if="error" class="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{{ error }}</p>

      <button type="button" @click="submitOrder" :disabled="loading" class="btn-primary w-full py-3 text-base">
        {{ loading ? 'Placing Order...' : 'Place Order' }}
      </button>
    </form>

    <!-- Success State -->
    <div v-else class="card text-center py-10 space-y-3">
      <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="text-lg font-bold text-gray-900">Order Placed!</h2>
      <p class="text-sm text-gray-500">{{ placedOrder?.order_number }}</p>
      <p class="text-xs text-gray-400">You'll receive notifications as your order progresses.</p>
      <div class="flex gap-3 justify-center mt-4">
        <router-link :to="`/app/orders/${placedOrder?.order_number}`" class="btn-primary text-sm">Track Order</router-link>
        <router-link to="/app" class="btn-secondary text-sm">Dashboard</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import api from '@/services/api'

const ordersStore = useOrdersStore()
const loading = ref(false)
const error = ref('')
const success = ref(false)
const placedOrder = ref<any>(null)
const locations = ref<any[]>([])
const ratePerLiter = ref(95)

const form = ref({
  product: 'HSD',
  delivery_location_id: '',
  quantity: 0,
  preferred_date: '',
  preferred_time: '10:00',
  payment_mode: 'credit',
  special_instructions: '',
})

const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]
const subtotal = computed(() => form.value.quantity * ratePerLiter.value)
const gst = computed(() => Math.round(subtotal.value * 0.05))
const total = computed(() => subtotal.value + gst.value)

async function submitOrder() {
  error.value = ''
  console.log('submitOrder called', JSON.stringify(form.value))

  // Explicit validation so errors are always visible
  if (!form.value.delivery_location_id) { error.value = 'Please select a delivery location.'; return }
  if (!form.value.quantity || form.value.quantity < 1) { error.value = 'Please enter a quantity.'; return }
  if (!form.value.preferred_date) { error.value = 'Please select a preferred delivery date.'; return }

  loading.value = true
  try {
    placedOrder.value = await ordersStore.placeOrder({
      product: form.value.product,
      delivery_location_id: form.value.delivery_location_id,
      quantity: form.value.quantity,
      preferred_date: form.value.preferred_date,
      preferred_time: form.value.preferred_time,
      payment_mode: form.value.payment_mode,
      special_instructions: form.value.special_instructions,
    })
    success.value = true
  } catch (e: any) {
    error.value = e.response?.data?.message || 'Failed to place order'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const { data } = await api.get('/profile/addresses')
  locations.value = data.data || []
})
</script>
