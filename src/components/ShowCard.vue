<script setup>
import { computed } from 'vue'

const props = defineProps({
  show: {
    type: Object,
    required: true,
    validator: (show) => {
      return show.name && show.image && show.rating && show.genres
    },
  },
})

const emit = defineEmits(['click'])

const rating = computed(() => {
  return props.show.rating?.average || 0
})
</script>

<template>
  <div class="show-card" @click="emit('click')">
    <div class="card-image-container">
      <img :src="show.image ? show.image.medium : ''" :alt="show.name" class="card-image" />
    </div>
    <div class="gradient-overlay"></div>
    <div class="card-content">
      <h3 class="show-title">{{ show.name }}</h3>
      <div class="rating-container">
        <span class="match-score">{{ Math.round(rating * 10) }}% Match</span>
      </div>
      <div class="genre-list">
        <span v-for="genre in show.genres.slice(0, 2)" :key="genre" class="genre-tag">
          {{ genre }}{{ genre !== show.genres[show.genres.length - 1] ? ' •' : '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.show-card {
  @apply relative hover:cursor-pointer transition-transform duration-200 hover:scale-105 flex flex-col;
  @apply w-[160px] sm:w-[180px] md:w-[200px];
  @apply min-w-[90px] md:min-w-[160px];
}

.card-image-container {
  @apply aspect-[2/3];
}

.card-image {
  @apply w-full h-full object-cover rounded-lg;
}

.gradient-overlay {
  @apply hidden sm:block absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none;
}

.card-content {
  @apply sm:absolute sm:bottom-0 sm:left-0 sm:right-0 sm:p-3;
  @apply py-2 px-2 h-[4.5rem] sm:h-auto;
}

.show-title {
  @apply text-white font-medium text-base sm:text-sm md:text-base line-clamp-1;
}

.rating-container {
  @apply flex items-center gap-1 sm:gap-2 text-xs sm:text-xs md:text-sm;
}

.match-score {
  @apply text-green-500 font-medium;
}

.genre-list {
  @apply hidden sm:flex mt-1 flex-wrap gap-1;
}

.genre-tag {
  @apply text-[10px] text-gray-300;
}
</style>
