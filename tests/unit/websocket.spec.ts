import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { websocketProtocolModule } from '@/modules/websocket-protocol'
import WebsocketProtocolStage from '@/modules/websocket-protocol/WebsocketProtocolStage.vue'
import { generateMaskKey, maskPayload, unmaskPayload, bytesToHex } from '@/utils/websocket'
import { useCamera } from '@/composables/useCamera'
import { i18n } from '@/locales'
import ElementPlus from 'element-plus'

describe('WebSocket Protocol Module & RFC 6455 Utilities', () => {
  it('should generate valid 4-byte masking key', () => {
    const key = generateMaskKey()
    expect(key.length).toBe(4)
    key.forEach((byte) => {
      expect(byte).toBeGreaterThanOrEqual(0)
      expect(byte).toBeLessThanOrEqual(255)
    })
  })

  it('should perform reversible XOR payload masking according to RFC 6455', () => {
    const sampleText = 'Candy WebSocket Stream 2026'
    const maskKey = [0x4a, 0x8f, 0xc2, 0x91]

    const { rawBytes, maskedBytes, keyHex, maskedHex } = maskPayload(sampleText, maskKey)

    expect(rawBytes.length).toBe(sampleText.length)
    expect(maskedBytes.length).toBe(sampleText.length)
    expect(keyHex).toBe('4A 8F C2 91')
    expect(maskedHex).toBeTruthy()

    // 异或的自反性：服务端使用相同掩码 key 再次异或，必须 100% 还原原始明文
    const recovered = unmaskPayload(maskedBytes, maskKey)
    expect(recovered).toBe(sampleText)
  })

  it('should validate WebSocket module metadata and step definitions', () => {
    expect(websocketProtocolModule.id).toBe('websocket-protocol')
    expect(websocketProtocolModule.steps.length).toBe(4)
    expect(websocketProtocolModule.totalDuration).toBe(23)

    websocketProtocolModule.steps.forEach((step, idx) => {
      expect(step.stepNumber).toBe(idx + 1)
      expect(step.duration).toBeGreaterThan(0)
      expect(step.camera).toBeDefined()
    })
  })

  it('should instantiate WebSocket animation timeline with strictly finite duration (23s)', async () => {
    const wrapper = mount(WebsocketProtocolStage, {
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
})
