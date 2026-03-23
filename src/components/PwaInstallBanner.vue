<template>
  <div class="fixed bottom-20 inset-x-0 px-4 z-50">
    <div class="max-w-lg mx-auto bg-blue-600 text-white rounded-2xl p-4 shadow-xl flex items-center gap-3">
      <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-sm font-semibold">Install FuelFlow App</p>
        <p class="text-xs text-blue-100">Add to home screen for faster access</p>
      </div>
      <div class="flex gap-2 shrink-0">
        <button @click="$emit('install')" class="bg-white text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-lg">
          Install
        </button>
        <button @click="$emit('dismiss')" class="text-blue-100 text-xs px-2">
          ✕
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(['install', 'dismiss'])
</script>
