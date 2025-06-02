<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import { useShowsStore } from '@/store/shows'
import ShowCard from '@/components/ShowCard.vue'

const route = useRoute()
const router = useRouter()
const showStore = useShowsStore()
const { showsByGenre } = storeToRefs(showStore)

const currentCategory = computed(() => route.params.category)
const categoryShows = computed(() => showsByGenre.value[currentCategory.value] || [])
</script>

<template>
  <main class="category-container">
    <div class="header-section">
      <div class="header-gradient"></div>
      <div class="header-overlay"></div>

      <div class="header-content">
        <button @click="router.push('/')" class="back-button">← Back to Dashboard</button>
        <h1 class="category-title">{{ currentCategory }}</h1>
        <p class="category-count">{{ categoryShows.length }} shows</p>
      </div>
    </div>

    <div class="shows-container">
      <div class="shows-grid">
        <ShowCard
          v-for="show in categoryShows"
          :key="show.id"
          :show="show"
          @click="router.push(`/show/${show.id}`)"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference 'tailwindcss';

.category-container {
  @apply bg-[#141414] text-white;
}

.header-section {
  @apply relative pt-4 pb-8 md:pb-12;
}

.header-gradient {
  @apply absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/60 to-[#141414] z-10;
}

.header-overlay {
  @apply absolute inset-0 bg-black/30;
}

.header-content {
  @apply relative z-20 h-full w-full px-2 md:px-4 flex flex-col justify-end pb-8 md:pb-12;
}

.back-button {
  @apply text-gray-300 hover:text-white flex items-center gap-2 mb-6;
}

.category-title {
  @apply text-3xl sm:text-4xl md:text-6xl font-bold;
}

.category-count {
  @apply text-gray-400 mt-2 md:mt-4 text-lg md:text-xl;
}

.shows-container {
  @apply w-full px-2 md:px-4 pb-8 md:pb-12;
}

.shows-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6;
}
</style>
