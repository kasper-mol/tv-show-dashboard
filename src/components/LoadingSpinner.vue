<script setup>
defineProps({
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
  color: {
    type: String,
    default: 'red',
    validator: (value) => ['red', 'white', 'blue'].includes(value),
  },
})
</script>

<template>
  <div class="loading-container">
    <div :class="['spinner', `spinner-${size}`, `spinner-${color}`]"></div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.loading-container {
  @apply flex justify-center items-center py-12;
}

.spinner {
  @apply animate-spin rounded-full border-4 border-t-transparent;
}

.spinner-sm {
  @apply h-8 w-8;
}

.spinner-md {
  @apply h-12 w-12;
}

.spinner-lg {
  @apply h-16 w-16;
}

.spinner-red {
  @apply border-red-600;
}

.spinner-white {
  @apply border-white;
}

.spinner-blue {
  @apply border-blue-600;
}
</style>
