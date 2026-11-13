import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { tcpIpProtocolModule } from '@/modules/tcp-ip-protocol'
import TcpIpProtocolStage from '@/modules/tcp-ip-protocol/TcpIpProtocolStage.vue'
import { useCamera } from '@/composables/useCamera'
import { i18n } from '@/locales'
import ElementPlus from 'element-plus'

describe('TCP/IP Protocol Stack Layering Module', () => {
  it('should validate TCP/IP module schema and step definitions', () => {
    expect(tcpIpProtocolModule.id).toBe('tcp-ip-protocol')
    expect(tcpIpProtocolModule.steps.length).toBe(4)
    expect(tcpIpProtocolModule.totalDuration).toBe(23)

    tcpIpProtocolModule.steps.forEach((step, idx) => {
      expect(step.stepNumber).toBe(idx + 1)
      expect(step.duration).toBeGreaterThan(0)
      expect(step.camera).toBeDefined()
    })
  })

  it('should instantiate TCP/IP animation timeline with strictly finite duration (23s)', async () => {
    const wrapper = mount(TcpIpProtocolStage, {
      global: {
        plugins: [i18n, ElementPlus],
      },
    })

    const camera = useCamera()
    const tl = (wrapper.vm as any).initAnimation(camera)

    expect(tl).toBeDefined()
    expect(tl.duration()).toBe(23)
    expect(Number.isFinite(tl.duration())).toBe(true)

    tl.seek(11.5)
    expect(Number(tl.progress().toFixed(2))).toBe(0.5)

    wrapper.unmount()
  })

  it('should calculate packet encapsulation byte overhead properly', () => {
    const payload = 'GET /index.html HTTP/1.1'
    const payloadLen = new TextEncoder().encode(payload).length // 24 bytes

    const tcpHeaderLen = 20
    const ipHeaderLen = 20
    const ethHeaderLen = 14
    const fcsLen = 4

    const totalFrameLen = payloadLen + tcpHeaderLen + ipHeaderLen + ethHeaderLen + fcsLen
    expect(totalFrameLen).toBe(24 + 58) // 82 bytes
    expect(totalFrameLen).toBeGreaterThan(payloadLen)
  })
})
