<script setup>
import { storeToRefs } from 'pinia'
import { useShowsStore } from '@/store/shows'
import SearchInput from '@/components/SearchInput.vue'
import ShowCard from '@/components/ShowCard.vue'
import HorizontalList from '@/components/HorizontalList.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const showStore = useShowsStore()
const { searchResults, isLoading, errorMessage, showsByGenre, availableGenres } =
  storeToRefs(showStore)

function handleSearch(query) {
  if (query) {
    showStore.searchShows(query)
  } else {
    showStore.clearSearch()
  }
}

function handleShowClick(showId) {
  router.push(`/show/${showId}`)
}

function handleSeeAll(category) {
  router.push(`/category/${category}`)
}
</script>

<template>
  <main class="home-container">
    <div class="hero-section">
      <div class="hero-gradient"></div>
      <div class="hero-background"></div>
      <div class="hero-overlay"></div>

      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title">Discover Your Next Favorite Show</h1>
          <p class="hero-description">
            Browse through thousands of TV shows across different genres
          </p>
        </div>
        <SearchInput placeholder="Search TV shows..." @search="handleSearch" class="hero-search" />
      </div>
    </div>

    <div class="content-wrapper">
      <div v-if="searchResults.length > 0" class="search-results-section">
        <h2 class="section-title">Search Results</h2>
        <div class="search-results-grid">
          <ShowCard
            v-for="show in searchResults"
            :key="show.id"
            :show="show"
            @click="handleShowClick(show.id)"
          />
        </div>
      </div>

      <div v-if="isLoading" class="loading-spinner">
        <div class="spinner"></div>
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div v-if="!isLoading && !searchResults.length" class="genres-section">
        <HorizontalList
          v-for="genre in availableGenres"
          :key="genre"
          :title="genre"
          :total-items="showsByGenre[genre].length"
          @see-all="handleSeeAll(genre)"
        >
          <ShowCard
            v-for="show in showsByGenre[genre]"
            :key="show.id"
            :show="show"
            @click="handleShowClick(show.id)"
          />
        </HorizontalList>
      </div>
    </div>
  </main>
</template>

<style scoped>
@reference 'tailwindcss';

.home-container {
  @apply bg-[#141414] text-white;
}

.hero-section {
  @apply relative pb-8 pt-8;
  @apply sm:h-[40vh] md:h-[30vh];
}

.hero-gradient {
  @apply absolute inset-0 bg-gradient-to-b from-transparent via-[#141414]/60 to-[#141414] z-10;
}

.hero-background {
  @apply absolute inset-0 bg-cover bg-center;
  background-image: url('https://api.tvmaze.com/shows/1/images/original');
}

.hero-overlay {
  @apply absolute inset-0 bg-black/30 z-5;
}

.hero-content {
  @apply relative z-20 h-full w-full px-4 flex flex-col md:flex-row md:justify-between;
}

.hero-text {
  @apply w-full md:w-auto flex flex-col justify-end;
}

.hero-title {
  @apply text-3xl sm:text-4xl md:text-6xl font-bold pb-4 text-white max-w-2xl;
}

.hero-description {
  @apply text-lg sm:text-xl text-gray-200 max-w-xl;
}

.hero-search {
  @apply w-full md:w-80 bg-black/40 backdrop-blur self-end mt-4 md:mt-0;
}

.content-wrapper {
  @apply w-full px-4 mt-4;
}

.search-results-section {
  @apply pb-8;
}

.section-title {
  @apply text-2xl font-bold pb-4;
}

.search-results-grid {
  @apply grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6;
}

.loading-spinner {
  @apply flex justify-center items-center py-12;
}

.spinner {
  @apply animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent;
}

.error-message {
  @apply bg-red-900/50 border border-red-700 text-red-200 px-6 py-4 rounded-lg pb-8;
}

.genres-section {
  @apply space-y-8 md:space-y-12 pb-8;
}
</style>
