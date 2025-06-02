<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...',
  },
  debounceMs: {
    type: Number,
    default: 300,
  },
})

const emit = defineEmits(['search'])
const searchQuery = ref('')
let debounceTimeout = null

watch(searchQuery, (newValue) => {
  if (debounceTimeout) clearTimeout(debounceTimeout)

  debounceTimeout = setTimeout(() => {
    emit('search', newValue)
  }, props.debounceMs)
})

function clearSearch() {
  searchQuery.value = ''
  emit('search', '')
}
</script>

<template>
  <div class="search-container">
    <input v-model="searchQuery" type="text" :placeholder="placeholder" class="search-input" />
    <button v-if="searchQuery" @click="clearSearch" class="clear-button">✕</button>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';

.search-container {
  @apply relative;
}

.search-input {
  @apply w-full px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500;
  transition: all 0.2s ease;
}

.search-input:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.clear-button {
  @apply absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600;
  padding: 4px;
  border-radius: 50%;
}

.clear-button:hover {
  background: rgba(0, 0, 0, 0.05);
}
</style>
