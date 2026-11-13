import { ref, computed, watch, onMounted, getCurrentInstance } from 'vue'
import type { ThemeMode } from '@/types/animation'

const STORAGE_KEY = 'candy_animation_theme'

// 全局响应式主题模式状态，初始值从 localStorage 读取或默认 system
const themeMode = ref<ThemeMode>(
  (typeof window !== 'undefined' && (localStorage.getItem(STORAGE_KEY) as ThemeMode)) || 'system'
)

// 操作系统深色模式媒体查询状态
const systemPrefersDark = ref<boolean>(false)

/**
 * 监听系统深色模式偏好变化
 */
function updateSystemPreference(): void {
  if (typeof window !== 'undefined' && window.matchMedia) {
    systemPrefersDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}

/**
 * 应用深色模式类名至 <html> 根节点
 * 同时触发 Tailwind 的 `dark:` 变体与 Element Plus 的深色变量系统
 * @param dark 是否启用深色模式
 */
export function applyDarkClass(dark: boolean): void {
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }
}

/**
 * 主题管理 Composable
 * 支持浅色 (light)、深色 (dark)、跟随系统 (system) 三态切换
 */
export function useTheme() {
  /**
   * 当前是否处于实际的深色渲染状态（计算属性）
   */
  const isDark = computed<boolean>(() => {
    if (themeMode.value === 'system') {
      return systemPrefersDark.value
    }
    return themeMode.value === 'dark'
  })

  /**
   * 设置目标主题模式并持久化至本地存储
   * @param mode 主题模式 ('light' | 'dark' | 'system')
   */
  function setTheme(mode: ThemeMode): void {
    themeMode.value = mode
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, mode)
    }
    applyDarkClass(isDark.value)
  }

  /**
   * 循环切换主题: light -> dark -> system -> light
   */
  function toggleTheme(): void {
    if (themeMode.value === 'light') {
      setTheme('dark')
    } else if (themeMode.value === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  // 监听实际深色状态变化，同步到 DOM
  watch(
    isDark,
    (val) => {
      applyDarkClass(val)
    },
    { immediate: true }
  )

  if (getCurrentInstance()) {
    onMounted(() => {
      updateSystemPreference()
      applyDarkClass(isDark.value)

      if (typeof window !== 'undefined' && window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handler = (e: MediaQueryListEvent) => {
          systemPrefersDark.value = e.matches
          if (themeMode.value === 'system') {
            applyDarkClass(e.matches)
          }
        }
        mediaQuery.addEventListener('change', handler)
      }
    })
  } else {
    // 即使在没有组件实例的环境中（如测试或全局导入），执行基础同步
    updateSystemPreference()
    applyDarkClass(isDark.value)
  }

  return {
    themeMode,
    isDark,
    setTheme,
    toggleTheme,
    updateSystemPreference,
  }
}
