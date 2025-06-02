import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowDetails from '../ShowDetails.vue'

// Mock RatingStars component
vi.mock('../RatingStars.vue', () => ({
  default: {
    name: 'RatingStars',
    props: ['rating', 'size'],
    template: '<div class="mock-rating-stars" data-testid="rating-stars"></div>',
  },
}))

describe('ShowDetails', () => {
  const defaultProps = {
    show: {
      name: 'Breaking Bad',
      image: {
        medium: 'https://example.com/poster.jpg',
      },
      rating: {
        average: 9.5,
      },
      genres: ['Drama', 'Crime', 'Thriller'],
      summary: 'A high school chemistry teacher turned methamphetamine manufacturer.',
      network: {
        name: 'AMC',
      },
      schedule: {
        days: ['Sunday'],
        time: '21:00',
      },
      status: 'Ended',
      type: 'Scripted',
      language: 'English',
    },
  }

  it('renders show title and basic info', () => {
    const wrapper = mount(ShowDetails, {
      props: defaultProps,
    })

    expect(wrapper.find('.show-title').text()).toBe('Breaking Bad')
    expect(wrapper.find('.poster-image').attributes('src')).toBe('https://example.com/poster.jpg')
    expect(wrapper.find('.match-score').text()).toBe('95% Match')
  })

  it('renders genre tags', () => {
    const wrapper = mount(ShowDetails, {
      props: defaultProps,
    })

    const genreTags = wrapper.findAll('.genre-tag')
    expect(genreTags).toHaveLength(3)
    expect(genreTags[0].text()).toBe('Drama')
    expect(genreTags[1].text()).toBe('Crime')
    expect(genreTags[2].text()).toBe('Thriller')
  })

  it('renders show summary', () => {
    const wrapper = mount(ShowDetails, {
      props: defaultProps,
    })

    expect(wrapper.find('.show-summary').text()).toBe(defaultProps.show.summary)
  })

  it('renders show metadata', () => {
    const wrapper = mount(ShowDetails, {
      props: defaultProps,
    })

    const metadataItems = wrapper.findAll('.metadata-item')

    expect(metadataItems[0].find('.metadata-label').text()).toBe('Network')
    expect(metadataItems[0].find('.metadata-value').text()).toBe('AMC')

    expect(metadataItems[1].find('.metadata-label').text()).toBe('Schedule')
    expect(metadataItems[1].find('.metadata-value').text()).toBe('Sunday at 21:00')

    expect(metadataItems[2].find('.metadata-label').text()).toBe('Status')
    expect(metadataItems[2].find('.metadata-value').text()).toBe('Ended')

    expect(metadataItems[3].find('.metadata-label').text()).toBe('Show Type')
    expect(metadataItems[3].find('.metadata-value').text()).toBe('Scripted')

    expect(metadataItems[4].find('.metadata-label').text()).toBe('Language')
    expect(metadataItems[4].find('.metadata-value').text()).toBe('English')
  })

  it('handles missing optional metadata gracefully', () => {
    const minimalShow = {
      name: 'Test Show',
      image: { medium: 'test.jpg' },
      rating: { average: 8 },
      genres: ['Drama'],
    }

    const wrapper = mount(ShowDetails, {
      props: { show: minimalShow },
    })

    const metadataLabels = wrapper.findAll('.metadata-label')
    const networkLabel = metadataLabels.find((label) => label.text() === 'Network')
    expect(networkLabel).toBeUndefined()

    expect(wrapper.find('.show-title').text()).toBe('Test Show')
    expect(wrapper.find('.genre-tag').text()).toBe('Drama')
  })

  it('handles missing rating gracefully', () => {
    const showWithoutRating = {
      ...defaultProps.show,
      rating: null,
    }

    const wrapper = mount(ShowDetails, {
      props: { show: showWithoutRating },
    })

    expect(wrapper.find('.match-score').text()).toBe('0% Match')
  })
})
