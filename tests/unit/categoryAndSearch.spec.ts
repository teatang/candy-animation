import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { i18n } from '@/locales'
import { router } from '@/router'
import CategoryView from '@/views/CategoryView.vue'
import GlobalSearchModal from '@/components/GlobalSearchModal.vue'

describe('Category View & Global Search Component Suite', () => {
  it('should render CategoryView for network category with correct modules and deep-link steps', async () => {
    const wrapper = mount(CategoryView, {
      props: {
        categoryId: 'network',
      },
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 验证分类标题与卡片
    expect(wrapper.find('h1').text()).toContain('网络通信与传输协议')
    const cards = wrapper.findAll('.category-module-card')
    expect(cards).toHaveLength(4)

    // 验证包含直达各模块的链接
    const links = wrapper.findAll('a')
    const hrefs = links.map((l) => l.attributes('href'))
    expect(hrefs.some((h) => h?.includes('/tcp-handshake-wave'))).toBe(true)
    expect(hrefs.some((h) => h?.includes('/https-handshake'))).toBe(true)

    // 验证步骤深链
    const stepLinks = wrapper.findAll('a[href*="?step="]')
    expect(stepLinks.length).toBeGreaterThan(5)

    wrapper.unmount()
  })

  it('should render CategoryView for crypto category with correct modules', async () => {
    const wrapper = mount(CategoryView, {
      props: {
        categoryId: 'crypto',
      },
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    expect(wrapper.find('h1').text()).toContain('现代密码学与散列算法')
    const cards = wrapper.findAll('.category-module-card')
    expect(cards).toHaveLength(2)

    wrapper.unmount()
  })

  it('should filter modules and steps properly in GlobalSearchModal', async () => {
    const wrapper = mount(GlobalSearchModal, {
      props: {
        modelValue: true,
      },
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    const vm = wrapper.vm as any

    // 初始状态下搜索词为空，展示分类快捷导航
    expect(vm.query).toBe('')
    expect(vm.searchResults).toHaveLength(0)

    // 输入 "TCP" 进行搜索
    vm.query = 'TCP'
    await wrapper.vm.$nextTick()

    expect(vm.searchResults.length).toBeGreaterThan(0)
    // 应该匹配到 TCP 相关的模块或步骤
    const hasTcpResult = vm.searchResults.some((r: any) =>
      r.title.toLowerCase().includes('tcp') || r.subtitle.toLowerCase().includes('tcp')
    )
    expect(hasTcpResult).toBe(true)

    // 输入未匹配内容
    vm.query = 'xyzNonExistentKeyword999'
    await wrapper.vm.$nextTick()
    expect(vm.searchResults).toHaveLength(0)

    wrapper.unmount()
  })
})
