import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { i18n } from '@/locales'
import { router } from '@/router'
import SidebarNav from '@/components/SidebarNav.vue'
import HomeView from '@/views/HomeView.vue'

describe('Sidebar Navigation & Home View Component Suite', () => {
  it('should render SidebarNav with categories and all 6 modules', async () => {
    const wrapper = mount(SidebarNav, {
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 应该包含首页入口
    const homeLinks = wrapper.findAll('a[href="/"]')
    expect(homeLinks.length).toBeGreaterThan(0)

    // 应该渲染出各模块直达链接
    const links = wrapper.findAll('a')
    const hrefs = links.map((l) => l.attributes('href'))

    expect(hrefs).toContain('/tcp-handshake-wave')
    expect(hrefs).toContain('/tcp-ip-protocol')
    expect(hrefs).toContain('/websocket-protocol')
    expect(hrefs).toContain('/https-handshake')
    expect(hrefs).toContain('/sha256-algorithm')
    expect(hrefs).toContain('/md5-algorithm')

    wrapper.unmount()
  })

  it('should mount HomeView with hero banner, stats, and categorized showcase', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 验证核心 DOM 结构与标语
    expect(wrapper.find('.hero-section').exists()).toBe(true)
    expect(wrapper.find('.hero-stats').exists()).toBe(true)
    expect(wrapper.findAll('.feature-card')).toHaveLength(3)

    // 验证分类模块卡片
    const moduleCards = wrapper.findAll('.module-card')
    expect(moduleCards).toHaveLength(6)

    // 验证包含带 ?step=N 的深链按钮
    const stepLinks = wrapper.findAll('a[href*="?step="]')
    expect(stepLinks.length).toBeGreaterThan(10)

    wrapper.unmount()
  })
})
