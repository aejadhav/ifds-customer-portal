<template>
  <div class="page">
    <div class="flex items-center gap-3">
      <button @click="$router.back()" class="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="text-xl font-bold text-gray-900">Notifications</h1>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div v-for="group in notificationGroups" :key="group.title" class="card space-y-3">
        <h2 class="font-semibold text-sm text-gray-900">{{ group.title }}</h2>
        <div v-for="item in group.items" :key="item.key" class="flex items-center justify-between">
          <p class="text-sm text-gray-700">{{ item.label }}</p>
          <button @click="item.enabled = !item.enabled" class="w-10 h-6 rounded-full transition-colors" :class="item.enabled ? 'bg-blue-600' : 'bg-gray-200'">
            <div class="w-4 h-4 bg-white rounded-full shadow transition-transform mx-1" :class="item.enabled ? 'translate-x-4' : 'translate-x-0'"></div>
          </button>
        </div>
      </div>
    </div>

    <div>
      <button class="btn-primary">Save Preferences</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const notificationGroups = reactive([
  {
    title: 'Order Updates',
    items: [
      { key: 'order_confirmed', label: 'Order Confirmed', enabled: true },
      { key: 'order_dispatched', label: 'Order Dispatched', enabled: true },
      { key: 'out_for_delivery', label: 'Out for Delivery (with ETA)', enabled: true },
      { key: 'order_delivered', label: 'Order Delivered', enabled: true },
    ],
  },
  {
    title: 'Payment Alerts',
    items: [
      { key: 'invoice_generated', label: 'Invoice Generated', enabled: true },
      { key: 'payment_due', label: 'Payment Due Reminder (3 days)', enabled: true },
      { key: 'payment_received', label: 'Payment Received', enabled: true },
    ],
  },
  {
    title: 'Account Alerts',
    items: [
      { key: 'credit_80', label: 'Credit Limit at 80%', enabled: true },
      { key: 'credit_exceeded', label: 'Credit Limit Exceeded', enabled: true },
    ],
  },
])
</script>
