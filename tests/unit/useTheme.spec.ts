import { describe, it, expect, beforeEach } from 'vitest'
import { useTheme, applyDarkClass } from '@/composables/useTheme'

describe('useTheme Composable', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
  })

  it('should initialize with default system or light/dark theme', () => {
    const { themeMode, isDark, setTheme } = useTheme()
    setTheme('light')
    expect(themeMode.value).toBe('light')
    expect(isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })

  it('should set dark mode and apply dark class to documentElement', () => {
    const { themeMode, isDark, setTheme } = useTheme()
    setTheme('dark')
    expect(themeMode.value).toBe('dark')
    expect(isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('candy_animation_theme')).toBe('dark')
  })

  it('should cycle through light -> dark -> system via toggleTheme', () => {
    const { themeMode, setTheme, toggleTheme } = useTheme()
    setTheme('light')
    expect(themeMode.value).toBe('light')

    toggleTheme()
    expect(themeMode.value).toBe('dark')

    toggleTheme()
    expect(themeMode.value).toBe('system')

    toggleTheme()
    expect(themeMode.value).toBe('light')
  })

  it('applyDarkClass should directly toggle dark class on html root', () => {
    applyDarkClass(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)

    applyDarkClass(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
