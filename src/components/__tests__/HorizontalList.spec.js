import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import HorizontalList from '../HorizontalList.vue'

describe('HorizontalList', () => {
  let wrapper

  const defaultProps = {
    title: 'Popular Shows',
    totalItems: 10,
  }

  beforeEach(() => {
    // Mock scrollTo function since it's not available in JSDOM
    Element.prototype.scrollTo = vi.fn()

    wrapper = mount(HorizontalList, {
      props: defaultProps,
      slots: {
        default: Array(5).fill('<div class="test-item">Item</div>').join(''),
      },
    })
  })

  afterEach(() => {
    wrapper.unmount()
    vi.restoreAllMocks()
  })

  describe('Title Section', () => {
    it('renders title correctly', () => {
      expect(wrapper.find('h2').text()).toBe('Popular Shows')
    })
  })

  describe('See All Button', () => {
    it('shows "See All" button when totalItems > 5', () => {
      const seeAllButton = wrapper.find('.see-all-button')
      expect(seeAllButton.exists()).toBe(true)
      expect(seeAllButton.text()).toBe('Explore All (10)')
    })

    it('hides "See All" button when totalItems <= 5', async () => {
      await wrapper.setProps({ totalItems: 5 })
      expect(wrapper.find('.see-all-button').exists()).toBe(false)
    })

    it('emits seeAll event when "See All" button is clicked', async () => {
      await wrapper.find('.see-all-button').trigger('click')
      expect(wrapper.emitted('seeAll')).toHaveLength(1)
    })
  })

  describe('Preview Container', () => {
    it('renders slot content in a container with correct styles', () => {
      const container = wrapper.find('.items-container')
      expect(container.exists()).toBe(true)
    })

    it('shows right gradient overlay with correct styles when totalItems > 5', () => {
      const overlay = wrapper.find('.gradient-overlay.right')
      expect(overlay.exists()).toBe(true)
    })

    it('hides gradient overlays when totalItems <= 5', async () => {
      await wrapper.setProps({ totalItems: 5 })
      expect(wrapper.find('.gradient-overlay').exists()).toBe(false)
    })
  })

  describe('Scroll Buttons', () => {
    it('shows right scroll button when totalItems > 5', () => {
      const rightButton = wrapper.find('.scroll-button.right')
      expect(rightButton.exists()).toBe(true)
    })

    it('shows left scroll button only when scrolled', async () => {
      const leftButton = wrapper.find('.scroll-button.left')
      expect(leftButton.exists()).toBe(false)

      const container = wrapper.find('.items-container').element
      Object.defineProperty(container, 'scrollLeft', { value: 100 })
      await wrapper.find('.items-container').trigger('scroll')
      await wrapper.vm.$nextTick()

      const leftButtonAfterScroll = wrapper.find('.scroll-button.left')
      expect(leftButtonAfterScroll.exists()).toBe(true)
    })

    it('calls scrollTo when buttons are clicked', async () => {
      const scrollToSpy = vi.spyOn(Element.prototype, 'scrollTo')
      const rightButton = wrapper.find('.scroll-button.right')
      await rightButton.trigger('click')

      expect(scrollToSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          behavior: 'smooth',
        }),
      )
    })
  })

  describe('Computed Properties', () => {
    it('correctly computes showSeeAll when totalItems > 5', () => {
      expect(wrapper.vm.showSeeAll).toBe(true)
    })

    it('correctly computes showSeeAll when totalItems <= 5', async () => {
      await wrapper.setProps({ totalItems: 5 })
      expect(wrapper.vm.showSeeAll).toBe(false)
    })
  })
})
