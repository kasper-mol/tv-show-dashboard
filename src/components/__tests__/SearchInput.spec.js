import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchInput from '../SearchInput.vue'

describe('SearchInput', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(SearchInput)
  })

  afterEach(() => {
    wrapper.unmount()
    vi.restoreAllMocks()
  })

  it('renders with default placeholder', () => {
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Search...')
  })

  it('renders with custom placeholder', async () => {
    await wrapper.setProps({ placeholder: 'Find shows...' })
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Find shows...')
  })

  it('emits search event after debounce', async () => {
    const input = wrapper.find('input')

    await input.setValue('test')
    expect(wrapper.emitted('search')).toBeFalsy()

    vi.advanceTimersByTime(300)
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['test'])
  })

  it('respects custom debounce time', async () => {
    await wrapper.setProps({ debounceMs: 500 })
    const input = wrapper.find('input')

    await input.setValue('test')
    vi.advanceTimersByTime(300)
    expect(wrapper.emitted('search')).toBeFalsy()

    vi.advanceTimersByTime(200)
    expect(wrapper.emitted('search')).toBeTruthy()
    expect(wrapper.emitted('search')[0]).toEqual(['test'])
  })

  it('shows clear button only when there is input', async () => {
    expect(wrapper.find('button').exists()).toBe(false)

    await wrapper.find('input').setValue('test')
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('clears input and emits empty search on clear button click', async () => {
    const input = wrapper.find('input')

    await input.setValue('test')
    vi.advanceTimersByTime(300)

    await wrapper.find('button').trigger('click')
    expect(wrapper.vm.searchQuery).toBe('')
    expect(wrapper.emitted('search').length).toBe(2)
    expect(wrapper.emitted('search')[1]).toEqual([''])
  })

  it('debounces multiple rapid changes', async () => {
    const input = wrapper.find('input')

    await input.setValue('t')
    await input.setValue('te')
    await input.setValue('tes')
    await input.setValue('test')

    expect(wrapper.emitted('search')).toBeFalsy()

    vi.advanceTimersByTime(300)
    expect(wrapper.emitted('search').length).toBe(1)
    expect(wrapper.emitted('search')[0]).toEqual(['test'])
  })
})
