<script setup>
defineProps({
  rating: {
    type: Number,
    required: true,
    validator: (value) => value >= 0 && value <= 10,
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value),
  },
})

const starSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
}
</script>

<template>
  <div class="rating-container">
    <div v-for="i in 5" :key="i" class="star-wrapper" :class="[starSizes[size]]">
      <svg
        class="empty-star"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
      <svg
        class="filled-star"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        :style="{ clipPath: `inset(0 ${100 - (rating / 10) * 100}% 0 0)` }"
      >
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        />
      </svg>
    </div>
    <span class="rating-text">{{ rating.toFixed(1) }}/10</span>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.rating-container {
  @apply flex items-center gap-1;
}

.star-wrapper {
  @apply relative;
}

.empty-star {
  @apply absolute inset-0 text-gray-300;
}

.filled-star {
  @apply absolute inset-0 text-yellow-400;
}

.rating-text {
  @apply text-sm text-gray-600;
}
</style>
