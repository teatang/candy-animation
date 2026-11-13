<template>
  <header
    class="w-full h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40"
  >
    <!-- 左侧 Logo 与标题 -->
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-candy-purple via-candy-cyan to-candy-pink flex items-center justify-center shadow-md shadow-purple-500/20">
        <span class="text-white text-lg font-black select-none">🍬</span>
      </div>
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <h1 class="font-extrabold text-base md:text-lg tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
            {{ t('app.title') }}
          </h1>
          <span class="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/20">
            v1.0
          </span>
        </div>
        <p class="hidden md:block text-[11px] text-slate-500 dark:text-slate-400">
          {{ t('app.slogan') }}
        </p>
      </div>
    </div>

    <!-- 中间模块切换器 (桌面端展示 Tab / 移动端下拉) -->
    <div class="flex items-center gap-1 sm:gap-2">
      <div class="flex bg-slate-100 dark:bg-slate-800/90 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60">
        <button
          v-for="mod in modules"
          :key="mod.id"
          class="px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          :class="
            currentModuleId === mod.id
              ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          "
          @click="$emit('selectModule', mod.id)"
        >
          <span
            class="w-2 h-2 rounded-full"
            :style="{ backgroundColor: mod.categoryColor }"
          ></span>
          <span>{{ t(mod.titleKey) }}</span>
        </button>
      </div>
    </div>

    <!-- 右侧操作栏 (主题 / 语言 / GitHub) -->
    <div class="flex items-center gap-2">
      <!-- 国际化语言切换 -->
      <el-dropdown trigger="click" @command="handleLocaleChange">
        <button
          class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center gap-1"
          :title="t('nav.language')"
        >
          <span>🌐</span>
          <span class="hidden sm:inline">{{ currentLocaleLabel }}</span>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="zh-CN" :disabled="currentLocale === 'zh-CN'">
              🇨🇳 简体中文
            </el-dropdown-item>
            <el-dropdown-item command="en-US" :disabled="currentLocale === 'en-US'">
              🇺🇸 English
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- 主题切换 (浅色 / 深色 / 系统) -->
      <el-dropdown trigger="click" @command="handleThemeChange">
        <button
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-sm"
          :title="t('nav.theme')"
        >
          <span v-if="themeMode === 'light'">☀️</span>
          <span v-else-if="themeMode === 'dark'">🌙</span>
          <span v-else>💻</span>
        </button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="light">
              <span class="mr-2">☀️</span>{{ t('theme.light') }}
            </el-dropdown-item>
            <el-dropdown-item command="dark">
              <span class="mr-2">🌙</span>{{ t('theme.dark') }}
            </el-dropdown-item>
            <el-dropdown-item command="system">
              <span class="mr-2">💻</span>{{ t('theme.system') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!-- GitHub 链接 -->
      <a
        href="https://github.com"
        target="_blank"
        rel="noopener noreferrer"
        class="hidden sm:flex p-2 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors items-center justify-center text-sm"
        :title="t('app.github')"
      >
        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      </a>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AnimationModule, ThemeMode } from '@/types/animation'
import { useTheme } from '@/composables/useTheme'
import { persistLocale, type SupportedLocale } from '@/locales'

defineProps<{
  modules: AnimationModule[]
  currentModuleId: string
}>()

const emit = defineEmits<{
  (e: 'selectModule', id: string): void
}>()

const { t, locale } = useI18n()
const { themeMode, setTheme } = useTheme()

const currentLocale = computed(() => locale.value as SupportedLocale)
const currentLocaleLabel = computed(() => (currentLocale.value === 'zh-CN' ? '中文' : 'EN'))

function handleLocaleChange(val: string): void {
  locale.value = val
  persistLocale(val as SupportedLocale)
}

function handleThemeChange(val: string): void {
  setTheme(val as ThemeMode)
}
</script>
