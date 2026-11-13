import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { i18n } from '@/locales'
import { useCamera } from '@/composables/useCamera'
import TcpHandshakeWaveStage from '@/modules/tcp-handshake-wave/TcpHandshakeWaveStage.vue'
import { tcpHandshakeWaveModule } from '@/modules/tcp-handshake-wave'

describe('TCP 3-Way Handshake & 4-Way Wave Termination Protocol', () => {
  it('should validate module configuration and steps', () => {
    expect(tcpHandshakeWaveModule.id).toBe('tcp-handshake-wave')
    expect(tcpHandshakeWaveModule.totalDuration).toBe(23)
    expect(tcpHandshakeWaveModule.steps).toHaveLength(4)

    const stepIds = tcpHandshakeWaveModule.steps.map((s) => s.id)
    expect(stepIds).toEqual([
      'tcp-handshake-syn',
      'tcp-handshake-ack',
      'tcp-wave-fin1',
      'tcp-wave-time-wait',
    ])

    const sumDuration = tcpHandshakeWaveModule.steps.reduce((acc, s) => acc + s.duration, 0)
    expect(sumDuration).toBe(23)
  })

  it('should mount stage and initialize timeline with finite 23s duration', () => {
    const wrapper = mount(TcpHandshakeWaveStage, {
      global: {
        plugins: [i18n, ElementPlus],
      },
    })

    const camera = useCamera()
    const tl = (wrapper.vm as any).initAnimation(camera)

    expect(tl).toBeDefined()
    const duration = tl.duration()
    expect(duration).toBe(23)
    expect(Number.isFinite(duration)).toBe(true)

    tl.seek(11.5)
    expect(Number(tl.progress().toFixed(2))).toBe(0.5)

    wrapper.unmount()
  })

  it('should provide interactive sequence numbers and 2MSL timer states', async () => {
    const wrapper = mount(TcpHandshakeWaveStage, {
      global: {
        plugins: [i18n, ElementPlus],
      },
    })

    const vm = wrapper.vm as any
    expect(vm.simSeqX).toBe(1000)
    expect(vm.simSeqY).toBe(5000)
    expect(vm.timerSeconds).toBe(120)

    vm.simSeqX = 2000
    vm.simSeqY = 8000
    expect(vm.simSeqX).toBe(2000)
    expect(vm.simSeqY).toBe(8000)

    wrapper.unmount()
  })
})
