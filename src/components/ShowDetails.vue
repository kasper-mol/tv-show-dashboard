<script setup>
import { computed, ref } from 'vue'
import RatingStars from './RatingStars.vue'

const props = defineProps({
  show: {
    type: Object,
    required: true,
    validator: (show) => {
      return show.name && show.image && show.rating && show.genres
    },
  },
})

const rating = computed(() => props.show.rating?.average || 0)
const isExpanded = ref(false)

const toggleSummary = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<template>
  <div class="show-details">
    <!-- Poster -->
    <div class="poster-container">
      <img
        v-if="show.image?.medium"
        :src="show.image.medium"
        :alt="show.name"
        class="poster-image"
      />
    </div>

    <!-- Info -->
    <div class="show-info">
      <h1 class="show-title">{{ show.name }}</h1>

      <div class="rating-container">
        <div class="rating-wrapper">
          <span class="match-score"> {{ Math.round(rating * 10) }}% Match </span>
          <RatingStars v-if="rating" :rating="rating" size="lg" />
        </div>
      </div>

      <div class="genre-tags">
        <span v-for="genre in show.genres" :key="genre" class="genre-tag">
          {{ genre }}
        </span>
      </div>

      <div class="summary-container">
        <p class="show-summary" :class="{ expanded: isExpanded }" v-html="show.summary"></p>
        <button
          v-if="show.summary && show.summary.length > 300"
          @click="toggleSummary"
          class="show-more-btn"
        >
          {{ isExpanded ? 'Show Less' : 'Show More' }}
        </button>
      </div>

      <div class="show-metadata">
        <div v-if="show.network" class="metadata-item">
          <div class="metadata-label">Network</div>
          <div class="metadata-value">{{ show.network.name }}</div>
        </div>
        <div v-if="show.schedule" class="metadata-item">
          <div class="metadata-label">Schedule</div>
          <div class="metadata-value">
            {{ show.schedule.days.join(', ') }} at
            {{ show.schedule.time }}
          </div>
        </div>
        <div v-if="show.status" class="metadata-item">
          <div class="metadata-label">Status</div>
          <div class="metadata-value">{{ show.status }}</div>
        </div>
        <div v-if="show.type" class="metadata-item">
          <div class="metadata-label">Show Type</div>
          <div class="metadata-value">{{ show.type }}</div>
        </div>
        <div v-if="show.language" class="metadata-item">
          <div class="metadata-label">Language</div>
          <div class="metadata-value">{{ show.language }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.show-details {
  @apply flex flex-col sm:flex-row gap-6 sm:gap-8 md:gap-12 items-start mt-8 sm:mt-0;
  min-height: fit-content;
}

.poster-container {
  @apply hidden sm:block w-64 md:w-80 flex-shrink-0 mx-auto sm:mx-0;
  position: relative;
}

.poster-image {
  @apply w-full rounded-lg shadow-2xl;
}

.show-info {
  @apply flex-grow space-y-3 sm:space-y-4 w-full sm:max-w-[60%] flex flex-col;
}

.show-title {
  @apply text-4xl sm:text-5xl md:text-6xl font-bold text-center sm:text-left;
}

.rating-container {
  @apply flex items-center justify-center sm:justify-start gap-3 sm:gap-6 mt-2 sm:mt-4;
}

.rating-wrapper {
  @apply flex items-center gap-2 sm:gap-4;
}

.match-score {
  @apply text-green-500 font-medium text-lg sm:text-xl;
}

.genre-tags {
  @apply flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3;
}

.genre-tag {
  @apply px-3 sm:px-4 py-1.5 bg-white/10 text-white rounded-full text-sm font-medium;
}

.summary-container {
  @apply mt-6 relative;
}

.show-summary {
  @apply text-gray-300 text-lg leading-relaxed max-w-3xl text-center sm:text-left;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 4.8em;
}

.show-summary.expanded {
  max-height: 1000px;
}

.show-more-btn {
  @apply mt-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 text-sm font-medium relative z-10;
  @apply block w-full text-center sm:text-left;
  transition: all 0.3s ease;
}

.show-metadata {
  @apply grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-sm mt-8 text-center sm:text-left;
}

.metadata-item {
  @apply text-sm;
}

.metadata-label {
  @apply text-gray-400 pb-1;
}

.metadata-value {
  @apply text-white;
}
</style>
