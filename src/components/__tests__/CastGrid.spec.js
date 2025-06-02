import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import CastGrid from '../CastGrid.vue'
import CastMember from '../CastMember.vue'

// Create mock component to avoid testing CastMember internals
vi.mock('../CastMember.vue', () => ({
  default: {
    name: 'CastMember',
    props: ['person', 'character'],
    template: '<div class="mock-cast-member" data-testid="cast-member"></div>',
  },
}))

describe('CastGrid', () => {
  const mockCast = [
    {
      person: {
        id: 1,
        name: 'Bryan Cranston',
        image: { medium: 'bryan.jpg' },
      },
      character: {
        name: 'Walter White',
      },
    },
    {
      person: {
        id: 2,
        name: 'Aaron Paul',
        image: { medium: 'aaron.jpg' },
      },
      character: {
        name: 'Jesse Pinkman',
      },
    },
  ]

  it('renders the cast section title', () => {
    const wrapper = mount(CastGrid, {
      props: {
        cast: mockCast,
      },
    })

    expect(wrapper.find('.cast-title').text()).toBe('Cast')
  })

  it('renders correct number of CastMember components', () => {
    const wrapper = mount(CastGrid, {
      props: {
        cast: mockCast,
      },
    })

    expect(wrapper.findAllComponents(CastMember)).toHaveLength(2)
  })

  it('passes correct props to CastMember components', () => {
    const wrapper = mount(CastGrid, {
      props: {
        cast: mockCast,
      },
    })

    const castMembers = wrapper.findAllComponents(CastMember)

    expect(castMembers[0].props('person')).toEqual(mockCast[0].person)
    expect(castMembers[0].props('character')).toEqual(mockCast[0].character)

    expect(castMembers[1].props('person')).toEqual(mockCast[1].person)
    expect(castMembers[1].props('character')).toEqual(mockCast[1].character)
  })
})
