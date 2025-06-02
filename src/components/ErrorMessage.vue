<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'error',
    validator: (value) => ['error', 'warning', 'info'].includes(value),
  },
})
</script>

<template>
  <div :class="['message-container', `message-${variant}`]">
    <div class="message-icon" v-if="variant === 'error'">⚠️</div>
    <div class="message-icon" v-else-if="variant === 'warning'">⚡</div>
    <div class="message-icon" v-else>ℹ️</div>
    <p class="message-text">{{ message }}</p>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.message-container {
  @apply flex items-center gap-3 px-6 py-4 rounded-lg mb-8;
}

.message-error {
  @apply bg-red-900/50 border border-red-700 text-red-200;
}

.message-warning {
  @apply bg-yellow-900/50 border border-yellow-700 text-yellow-200;
}

.message-info {
  @apply bg-blue-900/50 border border-blue-700 text-blue-200;
}

.message-icon {
  @apply text-xl;
}

.message-text {
  @apply text-sm;
}
</style>
