import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import enUS from './en-US'

export type SupportedLocale = 'zh-CN' | 'en-US'

const STORAGE_KEY = 'candy_animation_locale'

/**
 * 获取本地存储或默认偏好语言（默认 zh-CN）
 */
export function getSavedLocale(): SupportedLocale {
  if (typeof window === 'undefined') return 'zh-CN'
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved === 'zh-CN' || saved === 'en-US') {
    return saved
  }
  return 'zh-CN'
}

/**
 * 切换并持久化语言设置
 */
export function persistLocale(locale: SupportedLocale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, locale)
  }
}

export const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
})
