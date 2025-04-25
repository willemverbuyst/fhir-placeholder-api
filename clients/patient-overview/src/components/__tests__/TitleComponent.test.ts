import { describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import TitleComponent from '../TitleComponent.vue'

describe('TitleComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(TitleComponent, { props: { msg: 'Todo App' } })
    expect(wrapper.text()).toContain('Todo App')
  })
})
