import { describe, it, expect } from 'vitest'
import {
  animationModules,
  animationCategories,
  getCategorizedModules,
  DEFAULT_MODULE_ID,
  getModuleById,
  registerModule,
} from '@/modules'
import type { AnimationModule } from '@/types/animation'

describe('Animation Module Architecture & Registry', () => {
  it('should include the two built-in modules by default', () => {
    expect(animationModules.length).toBeGreaterThanOrEqual(2)
    const httpsMod = getModuleById('https-handshake')
    const md5Mod = getModuleById('md5-algorithm')

    expect(httpsMod).toBeDefined()
    expect(md5Mod).toBeDefined()
    expect(DEFAULT_MODULE_ID).toBe('https-handshake')
  })

  it('should provide categorized modules for navigation and home showcases', () => {
    expect(animationCategories.length).toBe(2)
    const catIds = animationCategories.map((c) => c.id)
    expect(catIds).toContain('network')
    expect(catIds).toContain('crypto')

    const categorized = getCategorizedModules()
    expect(categorized).toHaveLength(2)

    const networkCat = categorized.find((c) => c.id === 'network')
    const cryptoCat = categorized.find((c) => c.id === 'crypto')

    expect(networkCat).toBeDefined()
    expect(networkCat?.modules.length).toBe(4)
    expect(cryptoCat).toBeDefined()
    expect(cryptoCat?.modules.length).toBe(2)
  })

  it('should validate module schema and step integrity', () => {
    for (const mod of animationModules) {
      expect(mod.id).toBeTruthy()
      expect(mod.titleKey).toBeTruthy()
      expect(mod.summaryKey).toBeTruthy()
      expect(mod.categoryKey).toBeTruthy()
      expect(mod.categoryColor).toMatch(/^#[0-9a-fA-F]{6}$/)
      expect(mod.totalDuration).toBeGreaterThan(0)
      expect(mod.steps.length).toBeGreaterThanOrEqual(1)

      let prevStepNum = 0
      for (const step of mod.steps) {
        expect(step.id).toBeTruthy()
        expect(step.stepNumber).toBe(prevStepNum + 1)
        prevStepNum = step.stepNumber
        expect(step.titleKey).toBeTruthy()
        expect(step.descriptionKey).toBeTruthy()
        expect(step.duration).toBeGreaterThan(0)
        expect(typeof step.camera.x).toBe('number')
        expect(typeof step.camera.y).toBe('number')
        expect(step.camera.scale).toBeGreaterThan(0)
      }
    }
  })

  it('should allow dynamic registration of new animation modules', () => {
    const dummyModule: AnimationModule = {
      id: 'jwt-auth-flow',
      titleKey: 'modules.jwt.title',
      summaryKey: 'modules.jwt.summary',
      categoryKey: 'modules.jwt.category',
      categoryColor: '#f59e0b',
      totalDuration: 15,
      steps: [
        {
          id: 'step-jwt-1',
          stepNumber: 1,
          titleKey: 'jwt.step1',
          descriptionKey: 'jwt.step1.desc',
          duration: 15,
          camera: { x: 0, y: 0, scale: 1 },
        },
      ],
    }

    registerModule(dummyModule)
    expect(getModuleById('jwt-auth-flow')).toEqual(dummyModule)

    // 重复注册应当被幂等忽略
    registerModule(dummyModule)
    const count = animationModules.filter((m) => m.id === 'jwt-auth-flow').length
    expect(count).toBe(1)
  })
})
