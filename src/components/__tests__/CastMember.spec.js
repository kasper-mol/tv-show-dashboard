import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CastMember from '../CastMember.vue'

describe('CastMember', () => {
  const defaultProps = {
    person: {
      id: 1,
      name: 'Bryan Cranston',
      image: {
        medium: 'https://example.com/bryan.jpg',
      },
    },
    character: {
      name: 'Walter White',
    },
  }

  it('renders properly with all props', () => {
    const wrapper = mount(CastMember, {
      props: defaultProps,
    })

    expect(wrapper.find('.cast-name').text()).toBe('Bryan Cranston')
    expect(wrapper.find('.cast-character').text()).toBe('as Walter White')
    expect(wrapper.find('img').attributes('src')).toBe('https://example.com/bryan.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe('Bryan Cranston')
  })

  it('handles missing image gracefully', () => {
    const propsWithoutImage = {
      person: {
        id: 1,
        name: 'Bryan Cranston',
        image: null,
      },
      character: {
        name: 'Walter White',
      },
    }

    const wrapper = mount(CastMember, {
      props: propsWithoutImage,
    })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('.cast-name').text()).toBe('Bryan Cranston')
  })
})
