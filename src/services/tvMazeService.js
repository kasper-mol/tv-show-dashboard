import axios from 'axios'

const BASE_URL = 'https://api.tvmaze.com'

export const tvmazeService = {
  async getAllShows() {
    const response = await axios.get(`${BASE_URL}/shows`)
    return response.data
  },

  async searchShows(query) {
    const response = await axios.get(`${BASE_URL}/search/shows?q=${encodeURIComponent(query)}`)
    return response.data.map((item) => item.show)
  },

  async getShowDetails(id) {
    const [show, cast] = await Promise.all([
      axios.get(`${BASE_URL}/shows/${id}`),
      axios.get(`${BASE_URL}/shows/${id}/cast`),
    ])
    return {
      ...show.data,
      cast: cast.data,
    }
  },
}

export function groupShowsByGenre(shows) {
  const genres = new Set(shows.flatMap((show) => show.genres))
  const groupedShows = {}

  genres.forEach((genre) => {
    groupedShows[genre] = shows
      .filter((show) => show.genres.includes(genre))
      .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
  })

  return groupedShows
}

export function formatSummary(summary) {
  if (!summary) return ''
  return summary.replace(/<[^>]*>/g, '')
}
