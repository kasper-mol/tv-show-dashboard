import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import RatingStars from '../RatingStars.vue'

describe('RatingStars', () => {
  let wrapper
  let consoleError

  beforeEach(() => {
    wrapper = mount(RatingStars, {
      props: { rating: 5 }, // default rating for most tests
    })
  })

  afterEach(() => {
    wrapper.unmount()
    if (consoleError) {
      consoleError.mockRestore()
      consoleError = null
    }
  })

  it('renders the correct rating value', async () => {
    await wrapper.setProps({ rating: 7.5 })
    expect(wrapper.find('.rating-text').text()).toBe('7.5/10')
  })

  it('defaults to medium size when no size prop is provided', () => {
    const firstStar = wrapper.find('.star-wrapper')
    expect(firstStar.classes()).toContain('w-5')
    expect(firstStar.classes()).toContain('h-5')
  })

  it('renders correct number of stars', () => {
    expect(wrapper.findAll('.star-wrapper').length).toBe(5)
  })

  it('applies correct clip path based on rating', async () => {
    const rating = 7
    await wrapper.setProps({ rating })
    const filledStar = wrapper.find('.filled-star')
    const style = filledStar.attributes('style')
    const expectedClipPath = `clip-path: inset(0 ${100 - (rating / 10) * 100}% 0 0);`
    expect(style).toBe(expectedClipPath)
  })
})
