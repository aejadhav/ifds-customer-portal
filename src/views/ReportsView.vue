<template>
  <div class="page">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Reports</h1>
        <p class="text-sm text-gray-500 mt-0.5">Spending and order analytics</p>
      </div>
    </div>

    <!-- Period Selector -->
    <div class="flex gap-2 overflow-x-auto pb-1">
      <button
        v-for="p in periods"
        :key="p.value"
        @click="selectPeriod(p.value)"
        class="shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors"
        :class="period === p.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'"
      >
        {{ p.label }}
      </button>
    </div>

    <!-- Loading skeleton -->
    <div v-if="store.loading" class="space-y-4">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div v-for="i in 4" :key="i" class="skeleton h-20"></div>
      </div>
      <div class="skeleton h-48"></div>
      <div class="grid lg:grid-cols-3 gap-4">
        <div class="lg:col-span-2 skeleton h-40"></div>
        <div class="skeleton h-40"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="store.error" class="card text-center py-12">
      <p class="text-gray-400 text-sm">{{ store.error }}</p>
      <button @click="selectPeriod(period)" class="mt-3 text-blue-600 text-sm underline">Retry</button>
    </div>

    <template v-else>
      <!-- Summary Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div class="card">
          <p class="text-xs text-gray-500 mb-1">Total Orders</p>
          <p class="text-2xl font-bold text-gray-900">{{ store.data.summary.orders }}</p>
        </div>
        <div class="card">
          <p class="text-xs text-gray-500 mb-1">Total Volume</p>
          <p class="text-2xl font-bold text-gray-900">{{ formatVolume(store.data.summary.volume) }}</p>
        </div>
        <div class="card">
          <p class="text-xs text-gray-500 mb-1">Amount Spent</p>
          <p class="text-xl font-bold text-gray-900">₹{{ shortAmount(store.data.summary.amount) }}</p>
        </div>
        <div class="card">
          <p class="text-xs text-gray-500 mb-1">Avg Rate / L</p>
          <p class="text-2xl font-bold text-gray-900">₹{{ store.data.summary.avg_rate || '—' }}</p>
        </div>
      </div>

      <!-- Monthly Spend Chart -->
      <div class="card" v-if="store.data.monthly_trend.length > 0">
        <h2 class="font-semibold text-gray-900 text-sm mb-4">Monthly Spend</h2>
        <div class="overflow-x-auto">
          <svg :width="chartWidth" height="140" class="block">
            <!-- Grid lines -->
            <line
              v-for="(tick, i) in yTicks"
              :key="'grid-' + i"
              x1="40" :x2="chartWidth - 8"
              :y1="yPos(tick)" :y2="yPos(tick)"
              stroke="#f3f4f6" stroke-width="1"
            />
            <!-- Y axis labels -->
            <text
              v-for="(tick, i) in yTicks"
              :key="'ytick-' + i"
              x="36" :y="yPos(tick) + 4"
              text-anchor="end"
              class="text-[9px] fill-gray-400"
              font-size="9"
              fill="#9ca3af"
            >{{ shortAmount(tick) }}</text>
            <!-- Bars -->
            <g v-for="(row, i) in store.data.monthly_trend" :key="'bar-' + i">
              <rect
                :x="barX(i) + 4"
                :y="yPos(row.amount)"
                :width="barWidth - 8"
                :height="chartInnerH - yPos(row.amount) + chartTop"
                rx="3"
                :fill="barFill(i)"
                class="transition-all duration-300"
              />
              <!-- X label -->
              <text
                :x="barX(i) + barWidth / 2"
                y="136"
                text-anchor="middle"
                font-size="9"
                fill="#9ca3af"
              >{{ row.month }}</text>
            </g>
          </svg>
        </div>
      </div>
      <div class="card text-center py-8" v-else>
        <p class="text-gray-400 text-sm">No order data for this period.</p>
      </div>

      <!-- Bottom row: location breakdown + payment summary -->
      <div class="grid lg:grid-cols-3 gap-4">

        <!-- Location Breakdown -->
        <div class="lg:col-span-2 card space-y-4">
          <h2 class="font-semibold text-gray-900 text-sm">Volume by Location</h2>
          <div v-if="store.data.location_breakdown.length === 0" class="text-center py-6">
            <p class="text-gray-400 text-sm">No location data available.</p>
          </div>
          <div v-else v-for="loc in store.data.location_breakdown" :key="loc.name" class="space-y-1">
            <div class="flex justify-between text-sm">
              <span class="text-gray-700 truncate max-w-[60%]" :title="loc.name">{{ loc.name }}</span>
              <span class="font-medium text-gray-900 shrink-0 ml-2">{{ loc.percent }}%</span>
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all duration-500"
                :style="{ width: loc.percent + '%', backgroundColor: locationColor(loc.percent) }"
              ></div>
            </div>
            <div class="flex justify-between text-xs text-gray-400">
              <span>{{ formatVolume(loc.volume) }}</span>
              <span>₹{{ shortAmount(loc.amount) }} · {{ loc.orders }} order{{ loc.orders !== 1 ? 's' : '' }}</span>
            </div>
          </div>
        </div>

        <!-- Payment Summary + Download -->
        <div class="space-y-4">
          <div class="card space-y-3">
            <h2 class="font-semibold text-gray-900 text-sm">Payment Overview</h2>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">Total Invoices</span>
                <span class="font-medium">{{ store.data.payment_summary.total_invoices }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Amount Paid</span>
                <span class="font-medium text-green-700">₹{{ shortAmount(store.data.payment_summary.paid_amount) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">Outstanding</span>
                <span class="font-medium" :class="store.data.payment_summary.outstanding > 0 ? 'text-red-600' : 'text-gray-900'">
                  ₹{{ shortAmount(store.data.payment_summary.outstanding) }}
                </span>
              </div>
            </div>
            <router-link
              v-if="store.data.payment_summary.outstanding > 0"
              to="/app/payments/pay"
              class="btn-primary text-xs w-full text-center block py-2"
            >
              Pay Outstanding
            </router-link>
          </div>

          <button @click="downloadCsv" class="btn-secondary w-full text-sm flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 4v11" />
            </svg>
            Download CSV
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useReportsStore } from '@/stores/reports'

const store = useReportsStore()
const period = ref('this_month')

const periods = [
  { label: 'This Month', value: 'this_month' },
  { label: 'Last 3 Months', value: '3months' },
  { label: 'Last 6 Months', value: '6months' },
  { label: 'This Year', value: 'this_year' },
  { label: 'Last Year', value: 'last_year' },
]

function selectPeriod(p: string) {
  period.value = p
  store.fetchSummary(p)
}

// ── Chart geometry ────────────────────────────────────────────────────────────
const barWidth = computed(() => Math.max(40, Math.min(70, 480 / Math.max(store.data.monthly_trend.length, 1))))
const chartWidth = computed(() => Math.max(400, store.data.monthly_trend.length * barWidth.value + 48))
const chartTop = 10
const chartInnerH = 110

const maxAmount = computed(() =>
  Math.max(...store.data.monthly_trend.map((r) => r.amount), 1)
)

const yTicks = computed(() => {
  const max = maxAmount.value
  const step = Math.ceil(max / 3 / 10000) * 10000 || 1
  return [0, step, step * 2, step * 3].filter((t) => t <= max * 1.1)
})

function yPos(val: number): number {
  return chartTop + chartInnerH - (val / maxAmount.value) * chartInnerH
}

function barX(i: number): number {
  return 40 + i * barWidth.value
}

function barFill(i: number): string {
  const total = store.data.monthly_trend.length
  const ratio = total > 1 ? i / (total - 1) : 1
  // Gradient from light blue to primary blue
  const r = Math.round(96 + (37 - 96) * ratio)
  const g = Math.round(165 + (99 - 165) * ratio)
  const b = Math.round(250 + (235 - 250) * ratio)
  return `rgb(${r},${g},${b})`
}

function locationColor(percent: number): string {
  if (percent >= 50) return '#2563eb'
  if (percent >= 25) return '#3b82f6'
  return '#93c5fd'
}

// ── Formatters ────────────────────────────────────────────────────────────────
function shortAmount(val: number): string {
  if (val >= 10000000) return (val / 10000000).toFixed(1) + 'Cr'
  if (val >= 100000) return (val / 100000).toFixed(1) + 'L'
  if (val >= 1000) return (val / 1000).toFixed(0) + 'K'
  return val.toLocaleString('en-IN')
}

function formatVolume(litres: number): string {
  if (litres >= 1000000) return (litres / 1000000).toFixed(1) + 'M L'
  if (litres >= 1000) return (litres / 1000).toFixed(0) + 'K L'
  return litres.toLocaleString('en-IN') + ' L'
}

// ── CSV export ────────────────────────────────────────────────────────────────
function downloadCsv() {
  const rows = [
    ['Month', 'Orders', 'Volume (L)', 'Amount (₹)'],
    ...store.data.monthly_trend.map((r) => [r.month, r.orders, r.volume, r.amount]),
  ]
  const csv = rows.map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `fuelflow-report-${period.value}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => store.fetchSummary(period.value))
</script>
