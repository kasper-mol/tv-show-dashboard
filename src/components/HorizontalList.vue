<script setup>
import { computed, ref, onMounted, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
})

const emit = defineEmits(['seeAll'])
const showSeeAll = computed(() => props.totalItems > 5)
const containerRef = ref(null)
const showLeftGradient = ref(false)

function handleScroll() {
  if (!containerRef.value) return
  showLeftGradient.value = containerRef.value.scrollLeft > 0
}

function scroll(direction) {
  if (!containerRef.value) return

  const scrollAmount = containerRef.value.clientWidth * 0.8
  const newPosition =
    containerRef.value.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount)

  containerRef.value.scrollTo({
    left: newPosition,
    behavior: 'smooth',
  })
}

// Check scroll position after mounting and when showSeeAll changes
onMounted(() => {
  handleScroll()
})

watch(showSeeAll, () => {
  handleScroll()
})
</script>

<template>
  <section class="preview-section">
    <div class="header-container">
      <h2 class="section-title">{{ title }}</h2>
      <button v-if="showSeeAll" @click="emit('seeAll')" class="see-all-button" type="button">
        Explore All ({{ totalItems }})
      </button>
    </div>
    <div class="preview-container">
      <div v-if="showLeftGradient" class="gradient-overlay left"></div>

      <button
        v-if="showLeftGradient"
        @click="scroll('left')"
        class="scroll-button left"
        type="button"
        aria-label="Scroll left"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <div ref="containerRef" class="items-container" @scroll="handleScroll">
        <slot></slot>
      </div>

      <div v-if="showSeeAll" class="gradient-overlay right"></div>

      <button
        @click="scroll('right')"
        class="scroll-button right"
        type="button"
        aria-label="Scroll right"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';

.preview-section {
  @apply pb-4 sm:pb-8 relative w-full;
}

.header-container {
  @apply flex items-center justify-between pb-2 sm:pb-4 px-2 sm:px-4;
}

.section-title {
  @apply text-xl sm:text-2xl font-medium;
}

.preview-container {
  @apply px-2 sm:px-4 relative overflow-hidden;
}

.items-container {
  @apply flex gap-2 sm:gap-4 overflow-x-hidden scroll-smooth;
}

.scroll-button {
  @apply absolute top-1/2 -translate-y-1/2 z-20 
         bg-black/80 hover:bg-black/90 hover:scale-110
         text-white rounded-full p-2
         opacity-0 transition-opacity duration-200;
}

.preview-container:hover .scroll-button {
  @apply opacity-100;
}

.scroll-button.left {
  @apply left-2;
}
.scroll-button.right {
  @apply right-2;
}

.gradient-overlay {
  @apply absolute top-0 bottom-0 z-10 w-[200px];
}

.gradient-overlay.left {
  @apply left-0;
  background: linear-gradient(270deg, rgba(20, 20, 20, 0) 0%, rgb(20, 20, 20) 100%);
}

.gradient-overlay.right {
  @apply right-0;
  background: linear-gradient(90deg, rgba(20, 20, 20, 0) 0%, rgb(20, 20, 20) 100%);
}

.see-all-button {
  @apply text-gray-400 hover:text-white hover:bg-white/10
         text-xs sm:text-sm font-medium
         px-3 sm:px-4 py-1.5 sm:py-2
         rounded-lg transition-all duration-200 cursor-pointer;
}
</style>
