<template>
  <div class="page">
    <h1 class="text-xl font-bold text-gray-900 pt-2">Reports</h1>

    <!-- Period Selector — full width -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button v-for="p in periods" :key="p.value" @click="period = p.value" class="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors" :class="period === p.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'">
        {{ p.label }}
      </button>
    </div>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left col: summary stats + download -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Summary Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="card">
            <p class="text-xs text-gray-500 mb-1">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900">{{ summary.orders }}</p>
          </div>
          <div class="card">
            <p class="text-xs text-gray-500 mb-1">Total Volume</p>
            <p class="text-2xl font-bold text-gray-900">{{ (summary.volume / 1000).toFixed(0) }}K L</p>
          </div>
          <div class="card">
            <p class="text-xs text-gray-500 mb-1">Amount Spent</p>
            <p class="text-xl font-bold text-gray-900">₹{{ shortAmount(summary.amount) }}</p>
          </div>
          <div class="card">
            <p class="text-xs text-gray-500 mb-1">Avg Rate/L</p>
            <p class="text-2xl font-bold text-gray-900">₹{{ summary.avg_rate }}</p>
          </div>
        </div>

        <!-- Download -->
        <button class="btn-secondary w-full">
          ⬇ Download Report (PDF)
        </button>
      </div>

      <!-- Right col: location breakdown (sticky) -->
      <div class="lg:col-span-1 lg:sticky lg:top-24 lg:self-start">
        <div class="card space-y-3">
          <h2 class="font-semibold text-gray-900 text-sm">By Location</h2>
          <div v-for="loc in locationBreakdown" :key="loc.name" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-gray-700">{{ loc.name }}</span>
              <span class="font-medium">{{ loc.percent }}%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-blue-600 rounded-full" :style="{ width: loc.percent + '%' }"></div>
            </div>
            <p class="text-xs text-gray-400">{{ loc.volume.toLocaleString('en-IN') }} L</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const period = ref('this_month')
const periods = [
  { label: 'This Month', value: 'this_month' },
  { label: 'Last 3 Months', value: '3months' },
  { label: 'This Year', value: 'this_year' },
]

// Placeholder data — will be replaced with API call
const summary = reactive({ orders: 24, volume: 185000, amount: 17450000, avg_rate: 94.32 })
const locationBreakdown = [
  { name: 'Main Factory, Pune', volume: 120000, percent: 65 },
  { name: 'Warehouse, Talegaon', volume: 45000, percent: 24 },
  { name: 'Site, Mumbai', volume: 20000, percent: 11 },
]

function shortAmount(val: number) {
  if (val >= 10000000) return (val / 10000000).toFixed(1) + 'Cr'
  if (val >= 100000) return (val / 100000).toFixed(1) + 'L'
  return val.toLocaleString('en-IN')
}
</script>
