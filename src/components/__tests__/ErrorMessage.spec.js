import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ErrorMessage from '../ErrorMessage.vue'

describe('ErrorMessage', () => {
  const defaultMessage = 'Something went wrong'

  it('renders error variant by default', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: defaultMessage,
      },
    })

    expect(wrapper.find('.message-container').classes()).toContain('message-error')
    expect(wrapper.find('.message-text').text()).toBe(defaultMessage)
    expect(wrapper.find('.message-icon').text()).toBe('⚠️')
  })

  it('renders warning variant', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: defaultMessage,
        variant: 'warning',
      },
    })

    expect(wrapper.find('.message-container').classes()).toContain('message-warning')
    expect(wrapper.find('.message-icon').text()).toBe('⚡')
  })

  it('renders info variant', () => {
    const wrapper = mount(ErrorMessage, {
      props: {
        message: defaultMessage,
        variant: 'info',
      },
    })

    expect(wrapper.find('.message-container').classes()).toContain('message-info')
    expect(wrapper.find('.message-icon').text()).toBe('ℹ️')
  })
})
