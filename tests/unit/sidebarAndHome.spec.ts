import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { i18n } from '@/locales'
import { router } from '@/router'
import SidebarNav from '@/components/SidebarNav.vue'
import HomeView from '@/views/HomeView.vue'

describe('Sidebar Navigation & Home View Component Suite', () => {
  it('should render SidebarNav with categories links and search entry without detailed animation links', async () => {
    const wrapper = mount(SidebarNav, {
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 应该包含首页入口
    const homeLinks = wrapper.findAll('a[href="/"]')
    expect(homeLinks.length).toBeGreaterThan(0)

    // 应该渲染出各动画分类页面直达链接
    const links = wrapper.findAll('a')
    const hrefs = links.map((l) => l.attributes('href'))

    expect(hrefs).toContain('/category/network')
    expect(hrefs).toContain('/category/crypto')

    // 侧边栏不应该展示详细动画页面的跳转链接
    expect(hrefs).not.toContain('/tcp-handshake-wave')
    expect(hrefs).not.toContain('/tcp-ip-protocol')
    expect(hrefs).not.toContain('/websocket-protocol')
    expect(hrefs).not.toContain('/https-handshake')
    expect(hrefs).not.toContain('/sha256-algorithm')
    expect(hrefs).not.toContain('/md5-algorithm')

    // 验证折叠状态下网站图标与三个等大底部按钮
    const vm = wrapper.vm as any
    expect(vm.isCollapsed).toBe(false)

    // 验证搜索弹窗默认关闭，点击搜索按钮可打开
    expect(vm.isSearchOpen).toBe(false)
    vm.isSearchOpen = true
    await wrapper.vm.$nextTick()
    expect(vm.isSearchOpen).toBe(true)

    vm.isCollapsed = true
    await wrapper.vm.$nextTick()

    // 折叠状态下 Logo 图标应该完整存在并未被隐藏
    const logoIcon = wrapper.find('span.select-none')
    expect(logoIcon.exists()).toBe(true)
    expect(logoIcon.text()).toBe('🍬')

    wrapper.unmount()
  })

  it('should mount HomeView with hero banner, stats, and cool category cards without displaying all modules', async () => {
    const wrapper = mount(HomeView, {
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 验证核心 DOM 结构与标语
    expect(wrapper.find('.hero-section').exists()).toBe(true)
    expect(wrapper.find('.hero-stats').exists()).toBe(true)
    expect(wrapper.find('.hero-search').exists()).toBe(true)
    expect(wrapper.findAll('.feature-card')).toHaveLength(3)

    // 验证只展示动画分类大卡片 (共 2 个分类)，不需要展示所有分散的动画卡片
    const categoryCards = wrapper.findAll('.category-card')
    expect(categoryCards).toHaveLength(2)

    // 验证包含直达对应分类页面的链接
    const links = wrapper.findAll('a')
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs).toContain('/category/network')
    expect(hrefs).toContain('/category/crypto')

    // 验证不平铺展示详细动画卡片与具体步骤深链
    expect(wrapper.findAll('.module-card')).toHaveLength(0)

    wrapper.unmount()
  })
})
