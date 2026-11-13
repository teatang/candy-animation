<template>
  <div>
    <!-- 移动端顶部轻量栏 (仅在小屏幕显示) -->
    <header class="lg:hidden h-14 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between sticky top-0 z-40">
      <router-link to="/" class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white text-base shadow-sm">
          🍬
        </div>
        <span class="font-extrabold text-sm bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
          {{ t('app.title') }}
        </span>
      </router-link>

      <div class="flex items-center gap-2">
        <!-- 移动端语言/主题切换 -->
        <button
          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs"
          @click="toggleThemeQuick"
        >
          {{ themeMode === 'light' ? '☀️' : themeMode === 'dark' ? '🌙' : '💻' }}
        </button>
        <button
          class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold"
          @click="toggleLocaleQuick"
        >
          {{ currentLocale === 'zh-CN' ? '中' : 'EN' }}
        </button>

        <!-- 汉堡菜单按钮 -->
        <button
          class="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
          :title="t('nav.selectModule')"
          @click="isMobileDrawerOpen = true"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>

    <!-- 移动端抽屉 (Drawer) -->
    <el-drawer
      v-model="isMobileDrawerOpen"
      direction="ltr"
      size="85%"
      :with-header="false"
      class="!p-0 dark:!bg-slate-900"
    >
      <div class="h-full flex flex-col justify-between p-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100">
        <!-- 抽屉顶部 Logo -->
        <div>
          <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <router-link to="/" class="flex items-center gap-2.5" @click="isMobileDrawerOpen = false">
              <div class="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white text-base shadow-sm">
                🍬
              </div>
              <span class="font-extrabold text-base bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
                {{ t('app.title') }}
              </span>
            </router-link>
            <button
              class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              @click="isMobileDrawerOpen = false"
            >
              ✕
            </button>
          </div>

          <!-- 导航菜单 -->
          <nav class="space-y-4">
            <router-link
              to="/"
              class="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-colors"
              :class="isRouteActive('/') ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'"
              @click="isMobileDrawerOpen = false"
            >
              <span class="text-base">🏠</span>
              <span>{{ t('sidebar.home') }}</span>
            </router-link>

            <!-- 分类列表 -->
            <div v-for="cat in categorizedModules" :key="cat.id" class="space-y-1">
              <div class="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <span>{{ cat.icon }}</span>
                <span>{{ t(cat.titleKey) }}</span>
              </div>
              <div class="space-y-1 pl-2">
                <router-link
                  v-for="mod in cat.modules"
                  :key="mod.id"
                  :to="'/' + mod.id"
                  class="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors"
                  :class="isRouteActive('/' + mod.id) ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
                  @click="isMobileDrawerOpen = false"
                >
                  <div class="flex items-center gap-2 truncate">
                    <span class="w-2 h-2 rounded-full shrink-0" :style="{ backgroundColor: mod.categoryColor }"></span>
                    <span class="truncate">{{ t(mod.titleKey) }}</span>
                  </div>
                  <span class="text-[10px] opacity-70 shrink-0 font-mono">{{ mod.steps.length }}步</span>
                </router-link>
              </div>
            </div>
          </nav>
        </div>

        <!-- 抽屉底部操作区 -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <button
            class="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center gap-1.5"
            @click="handleCopyDirectUrl"
          >
            <span>🔗</span>
            <span>{{ t('nav.copyDirectUrl') }}</span>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-xs"
          >
            GitHub
          </a>
        </div>
      </div>
    </el-drawer>

    <!-- 桌面端固定侧边导航栏 (大屏幕显示) -->
    <aside
      class="hidden lg:flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all duration-300 z-30 select-none"
      :class="isCollapsed ? 'w-[74px] px-2' : 'w-[270px] px-3.5'"
    >
      <!-- 顶部 Logo 品牌区 -->
      <div>
        <div class="h-16 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 mb-3 px-1">
          <router-link to="/" class="flex items-center gap-2.5 group overflow-hidden">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
              <span class="text-white text-lg font-black">🍬</span>
            </div>
            <div v-show="!isCollapsed" class="flex flex-col truncate transition-opacity duration-200">
              <div class="flex items-center gap-1.5">
                <span class="font-extrabold text-base tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent truncate">
                  {{ t('app.title') }}
                </span>
                <span class="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/20">
                  v2.0
                </span>
              </div>
              <span class="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                {{ t('app.subTitle') }}
              </span>
            </div>
          </router-link>

          <!-- 折叠 / 展开切换按钮 -->
          <button
            class="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            :title="isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')"
            @click="isCollapsed = !isCollapsed"
          >
            <span v-if="isCollapsed" class="text-xs">▶</span>
            <span v-else class="text-xs">◀</span>
          </button>
        </div>

        <!-- 导航列表区域 -->
        <nav class="space-y-4 overflow-y-auto max-h-[calc(100vh-170px)] pr-0.5 custom-scrollbar">
          <!-- 首页入口 -->
          <router-link
            to="/"
            class="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all group"
            :class="isRouteActive('/') ? 'bg-gradient-to-r from-purple-600/10 to-indigo-600/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'"
          >
            <span class="text-sm shrink-0">🏠</span>
            <span v-show="!isCollapsed" class="truncate">{{ t('sidebar.home') }}</span>
          </router-link>

          <!-- 分类 1 & 2 列表 -->
          <div
            v-for="cat in categorizedModules"
            :key="cat.id"
            class="space-y-1"
          >
            <!-- 分类标题 -->
            <div
              v-show="!isCollapsed"
              class="px-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between"
            >
              <div class="flex items-center gap-1.5 truncate">
                <span>{{ cat.icon }}</span>
                <span class="truncate">{{ t(cat.titleKey) }}</span>
              </div>
              <span class="font-mono text-[9px] px-1 rounded bg-slate-100 dark:bg-slate-800">
                {{ cat.modules.length }}
              </span>
            </div>

            <!-- 分类分隔图标 (当侧边栏折叠时) -->
            <div
              v-show="isCollapsed"
              class="w-full text-center py-1 text-sm border-t border-slate-100 dark:border-slate-800/80"
              :title="t(cat.titleKey)"
            >
              {{ cat.icon }}
            </div>

            <!-- 模块项 -->
            <div class="space-y-0.5" :class="!isCollapsed ? 'pl-1' : ''">
              <router-link
                v-for="mod in cat.modules"
                :key="mod.id"
                :to="'/' + mod.id"
                class="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-all relative group"
                :class="
                  isRouteActive('/' + mod.id)
                    ? 'bg-purple-600/10 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/30 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                "
                :title="t(mod.titleKey)"
              >
                <div class="flex items-center gap-2 truncate">
                  <span
                    class="w-2 h-2 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                    :style="{ backgroundColor: mod.categoryColor }"
                  ></span>
                  <span v-show="!isCollapsed" class="truncate font-medium text-[11px] leading-tight">
                    {{ t(mod.titleKey) }}
                  </span>
                </div>
                <span
                  v-show="!isCollapsed"
                  class="text-[9px] font-mono opacity-60 shrink-0 ml-1 px-1 rounded bg-slate-100 dark:bg-slate-800"
                >
                  {{ mod.steps.length }}步
                </span>
              </router-link>
            </div>
          </div>
        </nav>
      </div>

      <!-- 底部控制区 (主题 / 语言 / 复制链接 / GitHub) -->
      <div class="pb-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
        <!-- 复制直达链接按钮 (在展开状态下显示完整文案) -->
        <button
          v-show="!isCollapsed"
          class="w-full px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          :title="t('nav.copyDirectUrl')"
          @click="handleCopyDirectUrl"
        >
          <span>🔗</span>
          <span class="truncate">{{ t('nav.copyDirectUrl') }}</span>
        </button>

        <button
          v-show="isCollapsed"
          class="w-full p-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center shadow-sm"
          :title="t('nav.copyDirectUrl')"
          @click="handleCopyDirectUrl"
        >
          <span>🔗</span>
        </button>

        <!-- 底部快捷工具栏 -->
        <div class="flex items-center justify-between gap-1" :class="isCollapsed ? 'flex-col gap-2' : ''">
          <!-- 国际化语言切换 -->
          <el-dropdown trigger="click" @command="handleLocaleChange">
            <button
              class="px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center gap-1"
              :class="isCollapsed ? 'w-full' : ''"
              :title="t('nav.language')"
            >
              <span>🌐</span>
              <span v-show="!isCollapsed" class="text-[11px]">{{ currentLocaleLabel }}</span>
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
              class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-xs"
              :class="isCollapsed ? 'w-full' : ''"
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
            class="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-xs"
            :class="isCollapsed ? 'w-full' : ''"
            :title="t('app.github')"
          >
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </a>
        </div>
      </div>
    </aside>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'
import type { ThemeMode } from '@/types/animation'
import { useTheme } from '@/composables/useTheme'
import { persistLocale, type SupportedLocale } from '@/locales'
import { getCategorizedModules } from '@/modules'

const route = useRoute()
const { t, locale } = useI18n()
const { themeMode, setTheme } = useTheme()

// 折叠状态 (桌面端)
const isCollapsed = ref<boolean>(false)
// 抽屉状态 (移动端)
const isMobileDrawerOpen = ref<boolean>(false)

// 分类模块清单
const categorizedModules = computed(() => getCategorizedModules())

const currentLocale = computed(() => locale.value as SupportedLocale)
const currentLocaleLabel = computed(() => (currentLocale.value === 'zh-CN' ? '中文' : 'EN'))

function isRouteActive(path: string): boolean {
  return route.path === path
}

function handleLocaleChange(val: string): void {
  locale.value = val
  persistLocale(val as SupportedLocale)
}

function toggleLocaleQuick(): void {
  const next = currentLocale.value === 'zh-CN' ? 'en-US' : 'zh-CN'
  handleLocaleChange(next)
}

function handleThemeChange(val: string): void {
  setTheme(val as ThemeMode)
}

function toggleThemeQuick(): void {
  const modes: ThemeMode[] = ['light', 'dark', 'system']
  const nextIdx = (modes.indexOf(themeMode.value) + 1) % modes.length
  setTheme(modes[nextIdx])
}

async function handleCopyDirectUrl(): Promise<void> {
  try {
    const directUrl = window.location.href
    await navigator.clipboard.writeText(directUrl)
    ElMessage.success({
      message: t('nav.copySuccess'),
      grouping: true,
    })
  } catch {
    ElMessage.warning(t('nav.copyFailed'))
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.3);
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(148, 163, 184, 0.6);
}
</style>
