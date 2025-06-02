import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowHero from '../ShowHero.vue'

describe('ShowHero', () => {
  const defaultProps = {
    backgroundImage: 'https://example.com/backdrop.jpg',
    onBack: vi.fn(),
  }

  it('renders with background image', () => {
    const wrapper = mount(ShowHero, {
      props: defaultProps,
    })

    const img = wrapper.find('.hero-image')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe(defaultProps.backgroundImage)
    expect(img.attributes('alt')).toBe('Show backdrop')
  })

  it('renders back button with correct text', () => {
    const wrapper = mount(ShowHero, {
      props: defaultProps,
    })

    const backButton = wrapper.find('.back-button')
    expect(backButton.exists()).toBe(true)
    expect(backButton.text()).toBe('← Back to Dashboard')
  })

  it('calls onBack when back button is clicked', async () => {
    const wrapper = mount(ShowHero, {
      props: defaultProps,
    })

    await wrapper.find('.back-button').trigger('click')
    expect(defaultProps.onBack).toHaveBeenCalled()
  })

  it('renders slot content', () => {
    const wrapper = mount(ShowHero, {
      props: defaultProps,
      slots: {
        default: '<div class="test-slot">Slot Content</div>',
      },
    })

    expect(wrapper.find('.test-slot').exists()).toBe(true)
    expect(wrapper.find('.test-slot').text()).toBe('Slot Content')
  })
})
