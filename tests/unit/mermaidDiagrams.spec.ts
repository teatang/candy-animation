import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import mermaid from 'mermaid'
import { i18n } from '@/locales'
import { router } from '@/router'
import { animationMermaidMap, getMermaidDiagram } from '@/utils/mermaidDiagrams'
import MermaidModal from '@/components/MermaidModal.vue'
import AnimationStageView from '@/views/AnimationStageView.vue'

describe('Mermaid Diagrams & Visualization Feature Suite', () => {
  const allModuleIds = [
    'tcp-handshake-wave',
    'tcp-ip-protocol',
    'websocket-protocol',
    'https-handshake',
    'sha256-algorithm',
    'md5-algorithm',
  ]

  it('should parse and render all 6 Mermaid diagram codes without render errors', async () => {
    // Mock getBBox for JSDOM
    if (typeof window !== 'undefined' && !(window as any).SVGElement.prototype.getBBox) {
      ;(window as any).SVGElement.prototype.getBBox = () => ({
        x: 0,
        y: 0,
        width: 600,
        height: 400,
      })
    }

    mermaid.initialize({
      startOnLoad: false,
      theme: 'dark',
      securityLevel: 'loose',
    })

    const renderErrors: Record<string, string> = {}
    for (const modId of allModuleIds) {
      const diagram = getMermaidDiagram(modId)
      expect(diagram).toBeDefined()
      try {
        const { svg } = await mermaid.render(`test-render-${modId.replace(/[^a-zA-Z0-9]/g, '-')}`, diagram!.code)
        expect(svg).toBeTruthy()
      } catch (err: any) {
        renderErrors[modId] = err?.message || String(err)
      }
    }

    if (Object.keys(renderErrors).length > 0) {
      console.error('Mermaid render errors found:', JSON.stringify(renderErrors, null, 2))
    }
    expect(renderErrors).toEqual({})
  })

  it('should have complete and valid Mermaid diagram definition for all 6 animation modules', () => {
    for (const modId of allModuleIds) {
      const diagram = getMermaidDiagram(modId)
      expect(diagram).toBeDefined()
      expect(diagram?.moduleId).toBe(modId)
      expect(diagram?.titleZh).toBeTruthy()
      expect(diagram?.titleEn).toBeTruthy()
      expect(diagram?.code).toBeTruthy()

      // 验证包含合法的 Mermaid 图表声明
      const code = diagram!.code.trim()
      const isValidMermaid =
        code.startsWith('sequenceDiagram') ||
        code.startsWith('flowchart') ||
        code.startsWith('graph')
      expect(isValidMermaid).toBe(true)
    }
  })

  it('should not show MermaidModal by default and render source and tabs when opened', async () => {
    const wrapper = mount(MermaidModal, {
      props: {
        modelValue: false,
        moduleId: 'tcp-handshake-wave',
      },
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 默认不需要展示
    expect(wrapper.find('.fixed').exists()).toBe(false)

    // 用户选择打开查看 Mermaid 图
    await wrapper.setProps({ modelValue: true })
    await wrapper.vm.$nextTick()

    // 弹窗出现并包含对应的标题和源码
    const vm = wrapper.vm as any
    expect(vm.diagramData).toBeDefined()
    expect(vm.diagramData.moduleId).toBe('tcp-handshake-wave')
    expect(vm.activeTab).toBe('preview')

    // 切换到源码视图
    vm.activeTab = 'source'
    await wrapper.vm.$nextTick()
    expect(vm.activeTab).toBe('source')

    wrapper.unmount()
  })

  it('should render Mermaid toggle button in AnimationStageView with default hidden modal', async () => {
    const wrapper = mount(AnimationStageView, {
      props: {
        moduleId: 'https-handshake',
      },
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    // 页面中应包含呼出 Mermaid 图表的按钮
    const mermaidBtn = wrapper.find('.mermaid-btn')
    expect(mermaidBtn.exists()).toBe(true)

    const vm = wrapper.vm as any
    // 默认不需要展示
    expect(vm.isMermaidModalOpen).toBe(false)

    // 用户点击后选择查看
    await mermaidBtn.trigger('click')
    expect(vm.isMermaidModalOpen).toBe(true)

    wrapper.unmount()
  })

  it('should support zoomIn, zoomOut and resetZoom controls in MermaidModal', async () => {
    const wrapper = mount(MermaidModal, {
      props: {
        modelValue: true,
        moduleId: 'sha256-algorithm',
      },
      global: {
        plugins: [i18n, router, ElementPlus],
      },
    })

    const vm = wrapper.vm as any
    expect(vm.zoomLevel).toBe(100)

    vm.zoomIn()
    expect(vm.zoomLevel).toBe(115)

    vm.zoomOut()
    expect(vm.zoomLevel).toBe(100)

    vm.zoomOut()
    expect(vm.zoomLevel).toBe(85)

    vm.resetZoom()
    expect(vm.zoomLevel).toBe(100)

    wrapper.unmount()
  })
})
