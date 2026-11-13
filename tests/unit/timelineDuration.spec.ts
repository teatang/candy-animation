import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HttpsHandshakeStage from '@/modules/https-handshake/HttpsHandshakeStage.vue'
import Md5AlgorithmStage from '@/modules/md5-algorithm/Md5AlgorithmStage.vue'
import { useCamera } from '@/composables/useCamera'
import { useGsapTimeline } from '@/composables/useGsapTimeline'
import { httpsHandshakeModule } from '@/modules/https-handshake'
import { md5AlgorithmModule } from '@/modules/md5-algorithm'
import { i18n } from '@/locales'
import ElementPlus from 'element-plus'

describe('Timeline Duration & Progress Bar Verification', () => {
  it('HTTPS timeline duration should be strictly finite and match declared totalDuration (23s)', async () => {
    const wrapper = mount(HttpsHandshakeStage, {
      global: {
        plugins: [i18n, ElementPlus],
      },
    })

    const camera = useCamera()
    const tl = (wrapper.vm as any).initAnimation(camera)

    expect(tl).toBeDefined()
    // 关键断言：杜绝 repeat: -1 导致的 100 亿秒无限持续时间
    const duration = tl.duration()
    expect(duration).toBe(23)
    expect(Number.isFinite(duration)).toBe(true)

    // 进度条在时间轴中点时应严格等于 0.5
    tl.seek(11.5)
    expect(Number(tl.progress().toFixed(2))).toBe(0.5)

    // 测试与 useGsapTimeline 联动
    const { initTimeline, seekProgress, progress, currentTime, totalDuration } = useGsapTimeline()
    initTimeline(tl, httpsHandshakeModule.steps)

    expect(totalDuration.value).toBe(23)

    seekProgress(0.5)
    expect(progress.value).toBe(0.5)
    expect(currentTime.value).toBe(11.5)

    wrapper.unmount()
  })

  it('MD5 timeline duration should be strictly finite and match declared totalDuration (23s)', async () => {
    const wrapper = mount(Md5AlgorithmStage, {
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

    const { initTimeline, seekProgress, progress, currentTime, totalDuration } = useGsapTimeline()
    initTimeline(tl, md5AlgorithmModule.steps)

    expect(totalDuration.value).toBe(23)

    seekProgress(0.75)
    expect(progress.value).toBe(0.75)
    expect(currentTime.value).toBe(17.3)

    wrapper.unmount()
  })
})
