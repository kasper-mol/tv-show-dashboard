import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowCard from '../ShowCard.vue'

describe('ShowCard', () => {
  let wrapper
  const mockShow = {
    name: 'Breaking Bad',
    image: {
      medium: 'https://example.com/image.jpg',
    },
    rating: {
      average: 9.5,
    },
    genres: ['Drama', 'Crime'],
  }

  beforeEach(() => {
    wrapper = mount(ShowCard, {
      props: {
        show: mockShow,
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  it('renders show title correctly', () => {
    expect(wrapper.find('.show-title').text()).toBe('Breaking Bad')
  })

  it('renders show image with correct src and alt', () => {
    const img = wrapper.find('.card-image')
    expect(img.attributes('src')).toBe('https://example.com/image.jpg')
    expect(img.attributes('alt')).toBe('Breaking Bad')
  })

  it('calculates and displays rating percentage correctly', () => {
    expect(wrapper.find('.match-score').text()).toBe('95% Match')
  })

  it('displays zero rating when no rating is provided', async () => {
    await wrapper.setProps({
      show: {
        ...mockShow,
        rating: {},
      },
    })
    expect(wrapper.find('.match-score').text()).toBe('0% Match')
  })

  it('displays only first two genres with bullet points', () => {
    const genres = wrapper.findAll('.genre-tag')
    expect(genres).toHaveLength(2)
    expect(genres[0].text()).toBe('Drama •')
    expect(genres[1].text()).toBe('Crime')
  })

  it('emits click event when clicked', async () => {
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toHaveProperty('click')
    expect(wrapper.emitted('click')).toHaveLength(1)
  })

  it('handles missing image gracefully', async () => {
    await wrapper.setProps({
      show: {
        ...mockShow,
        image: {},
      },
    })
    const img = wrapper.find('.card-image')
    expect(img.attributes('src')).toBeUndefined()
  })
})
