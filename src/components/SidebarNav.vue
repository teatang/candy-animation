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
          class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-center"
          @click="toggleThemeQuick"
        >
          {{ themeMode === 'light' ? '☀️' : themeMode === 'dark' ? '🌙' : '💻' }}
        </button>
        <button
          class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center"
          @click="toggleLocaleQuick"
        >
          {{ currentLocale === 'zh-CN' ? '中' : 'EN' }}
        </button>

        <!-- 汉堡菜单按钮 -->
        <button
          class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center"
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
              class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center"
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

        <!-- 抽屉底部四个等大操作按钮 -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-4 gap-2">
          <!-- 1. 复制链接 -->
          <button
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-sm"
            :title="t('nav.copyDirectUrl')"
            @click="handleCopyDirectUrl"
          >
            🔗
          </button>
          <!-- 2. 语言切换 -->
          <button
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-xs font-bold"
            :title="t('nav.language')"
            @click="toggleLocaleQuick"
          >
            {{ currentLocale === 'zh-CN' ? '中' : 'EN' }}
          </button>
          <!-- 3. 主题切换 -->
          <button
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-sm"
            :title="t('nav.theme')"
            @click="toggleThemeQuick"
          >
            {{ themeMode === 'light' ? '☀️' : themeMode === 'dark' ? '🌙' : '💻' }}
          </button>
          <!-- 4. GitHub -->
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-sm"
            :title="t('app.github')"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
        </div>
      </div>
    </el-drawer>

    <!-- 桌面端固定侧边导航栏 (大屏幕显示) -->
    <aside
      class="hidden lg:flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-all duration-300 z-30 select-none"
      :class="isCollapsed ? 'w-[76px] px-2' : 'w-[270px] px-3.5'"
    >
      <!-- 顶部 Logo 品牌区 -->
      <div>
        <div
          class="border-b border-slate-100 dark:border-slate-800/80 mb-3"
          :class="isCollapsed ? 'py-3 flex flex-col items-center gap-2' : 'h-16 flex items-center justify-between px-1'"
        >
          <!-- Logo 与品牌名称 -->
          <el-tooltip :content="t('app.title')" placement="right" :disabled="!isCollapsed">
            <router-link to="/" class="flex items-center gap-2.5 group overflow-hidden">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0">
                <span class="text-white text-lg font-black select-none">🍬</span>
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
          </el-tooltip>

          <!-- 折叠 / 展开切换按钮 -->
          <el-tooltip :content="isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')" placement="right">
            <button
              class="rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center justify-center"
              :class="isCollapsed ? 'w-8 h-8' : 'p-1.5'"
              :title="isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')"
              @click="isCollapsed = !isCollapsed"
            >
              <span v-if="isCollapsed" class="text-xs">▶</span>
              <span v-else class="text-xs">◀</span>
            </button>
          </el-tooltip>
        </div>

        <!-- 导航列表区域 -->
        <nav class="space-y-4 overflow-y-auto max-h-[calc(100vh-180px)] pr-0.5 custom-scrollbar">
          <!-- 首页入口 -->
          <el-tooltip :content="t('sidebar.home')" placement="right" :disabled="!isCollapsed">
            <router-link
              to="/"
              class="flex items-center rounded-xl text-xs font-semibold transition-all group"
              :class="[
                isCollapsed ? 'w-10 h-10 justify-center mx-auto' : 'gap-2.5 px-3 py-2',
                isRouteActive('/')
                  ? 'bg-gradient-to-r from-purple-600/10 to-indigo-600/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
              ]"
            >
              <span class="text-sm shrink-0">🏠</span>
              <span v-show="!isCollapsed" class="truncate">{{ t('sidebar.home') }}</span>
            </router-link>
          </el-tooltip>

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

            <!-- 分类分隔图标 (当侧边栏折叠时带 tooltip 提示) -->
            <el-tooltip :content="t(cat.titleKey)" placement="right" :disabled="!isCollapsed">
              <div
                v-show="isCollapsed"
                class="w-10 h-7 mx-auto flex items-center justify-center text-sm border-t border-slate-100 dark:border-slate-800/80 cursor-default opacity-80"
              >
                {{ cat.icon }}
              </div>
            </el-tooltip>

            <!-- 模块项 (折叠时为居中彩色圆点，鼠标悬停展示完整名称 tooltip) -->
            <div class="space-y-1" :class="!isCollapsed ? 'pl-1' : ''">
              <el-tooltip
                v-for="mod in cat.modules"
                :key="mod.id"
                :content="t(mod.titleKey)"
                placement="right"
                :disabled="!isCollapsed"
              >
                <router-link
                  :to="'/' + mod.id"
                  class="flex items-center rounded-xl text-xs transition-all relative group"
                  :class="[
                    isCollapsed ? 'w-10 h-10 justify-center mx-auto' : 'justify-between px-2.5 py-2',
                    isRouteActive('/' + mod.id)
                      ? 'bg-purple-600/10 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/30 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                  ]"
                >
                  <div class="flex items-center gap-2 truncate">
                    <span
                      class="rounded-full shrink-0 group-hover:scale-125 transition-transform"
                      :class="isCollapsed ? 'w-3 h-3 ring-2 ring-purple-500/25' : 'w-2 h-2'"
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
              </el-tooltip>
            </div>
          </div>
        </nav>
      </div>

      <!-- 底部控制区：四个大小完全一致的按钮 (展开为 4 列等大，折叠为居中单列等大) -->
      <div class="pb-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <!-- 展开状态：4 个等大按钮并排网格 -->
        <div v-show="!isCollapsed" class="grid grid-cols-4 gap-2 w-full">
          <!-- 1. 复制链接 -->
          <el-tooltip :content="t('nav.copyDirectUrl')" placement="top">
            <button
              class="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
              @click="handleCopyDirectUrl"
            >
              <span>🔗</span>
            </button>
          </el-tooltip>

          <!-- 2. 语言切换 -->
          <el-tooltip :content="t('nav.language')" placement="top">
            <el-dropdown trigger="click" class="!w-full !flex !justify-center" @command="handleLocaleChange">
              <button
                class="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-xs font-bold shadow-sm"
              >
                <span>{{ currentLocale === 'zh-CN' ? '中' : 'EN' }}</span>
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
          </el-tooltip>

          <!-- 3. 主题切换 -->
          <el-tooltip :content="t('nav.theme')" placement="top">
            <el-dropdown trigger="click" class="!w-full !flex !justify-center" @command="handleThemeChange">
              <button
                class="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
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
          </el-tooltip>

          <!-- 4. GitHub 链接 -->
          <el-tooltip :content="t('app.github')" placement="top">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </el-tooltip>
        </div>

        <!-- 折叠状态：4 个完全等大的 40x40 (w-10 h-10) 按钮居中垂直排列 -->
        <div v-show="isCollapsed" class="flex flex-col items-center gap-2 w-full">
          <!-- 1. 复制链接 -->
          <el-tooltip :content="t('nav.copyDirectUrl')" placement="right">
            <button
              class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
              @click="handleCopyDirectUrl"
            >
              <span>🔗</span>
            </button>
          </el-tooltip>

          <!-- 2. 语言切换 -->
          <el-tooltip :content="t('nav.language')" placement="right">
            <el-dropdown trigger="click" class="!flex !justify-center" @command="handleLocaleChange">
              <button
                class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-xs font-bold shadow-sm"
              >
                <span>{{ currentLocale === 'zh-CN' ? '中' : 'EN' }}</span>
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
          </el-tooltip>

          <!-- 3. 主题切换 -->
          <el-tooltip :content="t('nav.theme')" placement="right">
            <el-dropdown trigger="click" class="!flex !justify-center" @command="handleThemeChange">
              <button
                class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
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
          </el-tooltip>

          <!-- 4. GitHub 链接 -->
          <el-tooltip :content="t('app.github')" placement="right">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          </el-tooltip>
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
