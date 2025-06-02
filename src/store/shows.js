import { defineStore } from 'pinia'
import { ref } from 'vue'
import { tvmazeService, groupShowsByGenre } from '@/services/tvMazeService'

export const useShowsStore = defineStore('showStore', () => {
  const allShows = ref([])
  const searchResults = ref([])
  const selectedShow = ref(null)
  const isLoading = ref(false)
  const errorMessage = ref(null)
  const showsByGenre = ref({})
  const availableGenres = ref([])

  function updateGenreSortedData() {
    showsByGenre.value = groupShowsByGenre(allShows.value)
    availableGenres.value = Object.keys(showsByGenre.value).sort()
  }

  // Actions
  async function fetchAllShows() {
    try {
      isLoading.value = true
      errorMessage.value = null
      const shows = await tvmazeService.getAllShows()
      allShows.value = shows
      updateGenreSortedData()
    } catch (err) {
      errorMessage.value = 'Failed to fetch shows. Please try again later.'
      console.error('Error fetching shows:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function searchShows(searchQuery) {
    if (!searchQuery.trim()) {
      searchResults.value = []
      return
    }

    try {
      isLoading.value = true
      errorMessage.value = null
      searchResults.value = await tvmazeService.searchShows(searchQuery)
    } catch (err) {
      errorMessage.value = 'Failed to search shows. Please try again later.'
      console.error('Error searching shows:', err)
    } finally {
      isLoading.value = false
    }
  }

  async function fetchShowDetails(showId) {
    try {
      isLoading.value = true
      errorMessage.value = null
      selectedShow.value = await tvmazeService.getShowDetails(showId)
    } catch (err) {
      errorMessage.value = 'Failed to fetch show details. Please try again later.'
      console.error('Error fetching show details:', err)
    } finally {
      isLoading.value = false
    }
  }

  function clearSearch() {
    searchResults.value = []
  }

  function clearSelectedShow() {
    selectedShow.value = null
    searchResults.value = []
  }

  return {
    // State
    allShows,
    searchResults,
    selectedShow,
    isLoading,
    errorMessage,
    showsByGenre,
    availableGenres,

    // Actions
    fetchAllShows,
    searchShows,
    fetchShowDetails,
    clearSearch,
    clearSelectedShow,
    updateGenreSortedData,
  }
})
