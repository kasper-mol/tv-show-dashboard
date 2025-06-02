import { setActivePinia, createPinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useShowsStore } from '../shows'
import { tvmazeService, groupShowsByGenre } from '@/services/tvMazeService'

// Mock the tvMazeService
vi.mock('@/services/tvMazeService', () => ({
  tvmazeService: {
    getAllShows: vi.fn(),
    searchShows: vi.fn(),
    getShowDetails: vi.fn(),
  },
  groupShowsByGenre: vi.fn(),
}))

describe('Shows Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
    // Reset mock implementations
    tvmazeService.getAllShows.mockReset()
    tvmazeService.searchShows.mockReset()
    tvmazeService.getShowDetails.mockReset()
    groupShowsByGenre.mockReset()
  })

  describe('Initial State', () => {
    it('should have empty initial state', () => {
      const store = useShowsStore()
      expect(store.allShows).toEqual([])
      expect(store.searchResults).toEqual([])
      expect(store.selectedShow).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBeNull()
      expect(store.showsByGenre).toEqual({})
      expect(store.availableGenres).toEqual([])
    })
  })

  describe('fetchAllShows', () => {
    it('should fetch all shows successfully', async () => {
      const mockShows = [
        { id: 1, name: 'Show 1' },
        { id: 2, name: 'Show 2' },
      ]

      tvmazeService.getAllShows.mockResolvedValueOnce(mockShows)
      groupShowsByGenre.mockReturnValueOnce({})

      const store = useShowsStore()
      await store.fetchAllShows()

      expect(tvmazeService.getAllShows).toHaveBeenCalledTimes(1)
      expect(store.allShows).toEqual(mockShows)
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBeNull()
    })

    it('should handle errors when fetching shows', async () => {
      tvmazeService.getAllShows.mockRejectedValueOnce(new Error('API Error'))

      const store = useShowsStore()
      await store.fetchAllShows()

      expect(store.allShows).toEqual([])
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBe('Failed to fetch shows. Please try again later.')
    })

    it('should update genre sorting when shows are fetched', async () => {
      const mockShows = [
        { id: 1, name: 'Show 1', genres: ['Drama', 'Action'] },
        { id: 2, name: 'Show 2', genres: ['Comedy'] },
        { id: 3, name: 'Show 3', genres: ['Drama'] },
      ]
      const mockGroupedShows = {
        Drama: [mockShows[0], mockShows[2]],
        Action: [mockShows[0]],
        Comedy: [mockShows[1]],
      }

      tvmazeService.getAllShows.mockResolvedValueOnce(mockShows)
      groupShowsByGenre.mockReturnValueOnce(mockGroupedShows)

      const store = useShowsStore()
      await store.fetchAllShows()

      expect(groupShowsByGenre).toHaveBeenCalledWith(mockShows)
      expect(store.showsByGenre).toEqual(mockGroupedShows)
      expect(store.availableGenres).toEqual(['Action', 'Comedy', 'Drama'])
    })
  })

  describe('searchShows', () => {
    it('should clear results for empty query', async () => {
      const store = useShowsStore()
      await store.searchShows('   ')

      expect(store.searchResults).toEqual([])
      expect(tvmazeService.searchShows).not.toHaveBeenCalled()
    })

    it('should search shows successfully', async () => {
      const mockResults = [{ show: { id: 1, name: 'Show 1' } }, { show: { id: 2, name: 'Show 2' } }]
      tvmazeService.searchShows.mockResolvedValue(mockResults)

      const store = useShowsStore()
      await store.searchShows('test')

      expect(store.searchResults).toEqual(mockResults)
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBeNull()
    })

    it('should handle search errors', async () => {
      tvmazeService.searchShows.mockRejectedValue(new Error('API Error'))

      const store = useShowsStore()
      await store.searchShows('test')

      expect(store.searchResults).toEqual([])
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBe('Failed to search shows. Please try again later.')
    })
  })

  describe('fetchShowDetails', () => {
    it('should fetch show details successfully', async () => {
      const mockShow = { id: 1, name: 'Show 1', summary: 'Test summary' }
      tvmazeService.getShowDetails.mockResolvedValue(mockShow)

      const store = useShowsStore()
      await store.fetchShowDetails(1)

      expect(store.selectedShow).toEqual(mockShow)
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBeNull()
    })

    it('should handle errors when fetching show details', async () => {
      tvmazeService.getShowDetails.mockRejectedValue(new Error('API Error'))

      const store = useShowsStore()
      await store.fetchShowDetails(1)

      expect(store.selectedShow).toBeNull()
      expect(store.isLoading).toBe(false)
      expect(store.errorMessage).toBe('Failed to fetch show details. Please try again later.')
    })
  })

  describe('Genre Sorting', () => {
    it('should update genres when shows are grouped', () => {
      const mockShows = [
        { id: 1, name: 'Show 1', genres: ['Drama', 'Action'] },
        { id: 2, name: 'Show 2', genres: ['Comedy'] },
        { id: 3, name: 'Show 3', genres: ['Drama'] },
      ]
      const mockGroupedShows = {
        Drama: [mockShows[0], mockShows[2]],
        Action: [mockShows[0]],
        Comedy: [mockShows[1]],
      }

      groupShowsByGenre.mockReturnValueOnce(mockGroupedShows)

      const store = useShowsStore()
      store.allShows = mockShows
      store.updateGenreSortedData()

      expect(groupShowsByGenre).toHaveBeenCalledWith(mockShows)
      expect(groupShowsByGenre).toHaveBeenCalledTimes(1)
      expect(store.showsByGenre).toEqual(mockGroupedShows)
      expect(store.availableGenres).toEqual(['Action', 'Comedy', 'Drama'])
    })

    it('should handle empty shows list', () => {
      const emptyGroupedShows = {}
      groupShowsByGenre.mockReturnValueOnce(emptyGroupedShows)

      const store = useShowsStore()
      store.allShows = []
      store.updateGenreSortedData()

      expect(groupShowsByGenre).toHaveBeenCalledWith([])
      expect(groupShowsByGenre).toHaveBeenCalledTimes(1)
      expect(store.showsByGenre).toEqual(emptyGroupedShows)
      expect(store.availableGenres).toEqual([])
    })

    it('should handle shows with no genres', () => {
      const mockShows = [
        { id: 1, name: 'Show 1', genres: [] },
        { id: 2, name: 'Show 2', genres: [] },
      ]
      const emptyGroupedShows = {}

      groupShowsByGenre.mockReturnValueOnce(emptyGroupedShows)

      const store = useShowsStore()
      store.allShows = mockShows
      store.updateGenreSortedData()

      expect(groupShowsByGenre).toHaveBeenCalledWith(mockShows)
      expect(groupShowsByGenre).toHaveBeenCalledTimes(1)
      expect(store.showsByGenre).toEqual(emptyGroupedShows)
      expect(store.availableGenres).toEqual([])
    })
  })

  describe('Clear Functions', () => {
    it('should clear search results', () => {
      const store = useShowsStore()
      store.searchResults = [{ id: 1 }]

      store.clearSearch()
      expect(store.searchResults).toEqual([])
    })

    it('should clear selected show and search results', () => {
      const store = useShowsStore()
      store.selectedShow = { id: 1 }
      store.searchResults = [{ id: 1 }]

      store.clearSelectedShow()
      expect(store.selectedShow).toBeNull()
      expect(store.searchResults).toEqual([])
    })
  })
})
