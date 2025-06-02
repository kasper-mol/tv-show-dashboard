import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import LoadingSpinner from '../LoadingSpinner.vue'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    const wrapper = mount(LoadingSpinner)
    const spinner = wrapper.find('.spinner')

    expect(spinner.exists()).toBe(true)
    expect(spinner.classes()).toContain('spinner-md')
    expect(spinner.classes()).toContain('spinner-red')
  })

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg']

    sizes.forEach((size) => {
      const wrapper = mount(LoadingSpinner, {
        props: { size },
      })

      const spinner = wrapper.find('.spinner')
      expect(spinner.classes()).toContain(`spinner-${size}`)
    })
  })

  it('renders with different colors', () => {
    const colors = ['red', 'white', 'blue']

    colors.forEach((color) => {
      const wrapper = mount(LoadingSpinner, {
        props: { color },
      })

      const spinner = wrapper.find('.spinner')
      expect(spinner.classes()).toContain(`spinner-${color}`)
    })
  })

  it('combines size and color props correctly', () => {
    const wrapper = mount(LoadingSpinner, {
      props: {
        size: 'lg',
        color: 'blue',
      },
    })

    const spinner = wrapper.find('.spinner')
    expect(spinner.classes()).toContain('spinner-lg')
    expect(spinner.classes()).toContain('spinner-blue')
  })
})
