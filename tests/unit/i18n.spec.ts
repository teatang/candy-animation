import { describe, it, expect, beforeEach } from 'vitest'
import zhCN from '@/locales/zh-CN'
import enUS from '@/locales/en-US'
import { getSavedLocale, persistLocale } from '@/locales'
import { animationModules } from '@/modules'

/**
 * 递归收集对象所有的扁平化 key 路径 (例如 app.title, modules.https.title)
 */
function getAllKeys(obj: Record<string, any>, prefix = ''): string[] {
  let keys: string[] = []
  for (const k of Object.keys(obj)) {
    const val = obj[k]
    const fullPath = prefix ? `${prefix}.${k}` : k
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys = keys.concat(getAllKeys(val, fullPath))
    } else {
      keys.push(fullPath)
    }
  }
  return keys
}

describe('i18n Locales & Translation Integrity', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('should maintain 100% translation key parity between zh-CN and en-US', () => {
    const zhKeys = getAllKeys(zhCN).sort()
    const enKeys = getAllKeys(enUS).sort()

    expect(zhKeys).toEqual(enKeys)
  })

  it('should persist and retrieve user locale preference', () => {
    expect(getSavedLocale()).toBe('zh-CN')

    persistLocale('en-US')
    expect(getSavedLocale()).toBe('en-US')

    persistLocale('zh-CN')
    expect(getSavedLocale()).toBe('zh-CN')
  })

  it('should have all animation module title, summary, step keys defined in locales', () => {
    const zhKeysSet = new Set(getAllKeys(zhCN))

    for (const mod of animationModules) {
      expect(zhKeysSet.has(mod.titleKey)).toBe(true)
      expect(zhKeysSet.has(mod.summaryKey)).toBe(true)
      expect(zhKeysSet.has(mod.categoryKey)).toBe(true)

      for (const step of mod.steps) {
        expect(zhKeysSet.has(step.titleKey)).toBe(true)
        expect(zhKeysSet.has(step.descriptionKey)).toBe(true)
        if (step.badgeKey) {
          expect(zhKeysSet.has(step.badgeKey)).toBe(true)
        }
      }
    }
  })
})
