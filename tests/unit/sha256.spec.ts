import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ElementPlus from 'element-plus'
import { i18n } from '@/locales'
import { useCamera } from '@/composables/useCamera'
import { computeSha256, compareSha256Avalanche } from '@/utils/sha256'
import Sha256AlgorithmStage from '@/modules/sha256-algorithm/Sha256AlgorithmStage.vue'
import { sha256AlgorithmModule } from '@/modules/sha256-algorithm'

describe('SHA-256 Algorithm & Avalanche Lab', () => {
  it('should compute correct standard SHA-256 digests', () => {
    // 空字符串的标准哈希值
    expect(computeSha256('')).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
    )

    // 标准测试向量 "abc"
    expect(computeSha256('abc')).toBe(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    )

    // 自定义测试向量
    const hash = computeSha256('Candy')
    expect(hash).toHaveLength(64)
    expect(hash).toMatch(/^[0-9a-f]{64}$/)
  })

  it('should measure 256-bit avalanche diffusion between minor text differences', () => {
    const hashA = computeSha256('Candy')
    const hashB = computeSha256('candy')

    const avalanche = compareSha256Avalanche(hashA, hashB)

    expect(avalanche.bitsA).toHaveLength(256)
    expect(avalanche.bitsB).toHaveLength(256)
    expect(avalanche.diffCount).toBeGreaterThan(80) // 显著雪崩效应
    expect(avalanche.diffRatio).toBeGreaterThan(30)
    expect(avalanche.diffRatio).toBeLessThan(70)
  })

  it('should instantiate Sha256AlgorithmStage with finite 23s duration timeline', () => {
    const wrapper = mount(Sha256AlgorithmStage, {
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

    expect(sha256AlgorithmModule.totalDuration).toBe(23)
    expect(sha256AlgorithmModule.steps).toHaveLength(4)

    wrapper.unmount()
  })
})
