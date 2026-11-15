<template>
  <div>
    <!-- 移动端顶部轻量栏 (仅在小屏幕显示) -->
    <header
      class="lg:hidden h-14 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between sticky top-0 z-40"
    >
      <router-link to="/" class="flex items-center gap-2">
        <div
          class="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white text-base shadow-sm"
        >
          🍬
        </div>
        <span
          class="font-extrabold text-sm bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent"
        >
          {{ t("app.title") }}
        </span>
      </router-link>

      <div class="flex items-center gap-2">
        <!-- 移动端全局搜索按钮 -->
        <button
          class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs flex items-center justify-center hover:border-purple-400 hover:text-purple-600 transition-colors"
          :title="t('nav.searchButton')"
          @click="isSearchOpen = true"
        >
          🔍
        </button>

        <!-- 移动端语言/主题切换 -->
        <button
          class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-center"
          @click="toggleThemeQuick"
        >
          {{
            themeMode === "light" ? "☀️" : themeMode === "dark" ? "🌙" : "💻"
          }}
        </button>
        <button
          class="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-bold flex items-center justify-center"
          @click="toggleLocaleQuick"
        >
          {{ currentLocale === "zh-CN" ? "中" : "EN" }}
        </button>

        <!-- 汉堡菜单按钮 -->
        <button
          class="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center"
          :title="t('nav.selectModule')"
          @click="isMobileDrawerOpen = true"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
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
      <div
        class="h-full flex flex-col justify-between p-4 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100"
      >
        <!-- 抽屉顶部 Logo 与搜索 -->
        <div>
          <div
            class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4"
          >
            <router-link
              to="/"
              class="flex items-center gap-2.5"
              @click="isMobileDrawerOpen = false"
            >
              <div
                class="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white text-base shadow-sm"
              >
                🍬
              </div>
              <span
                class="font-extrabold text-base bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent"
              >
                {{ t("app.title") }}
              </span>
            </router-link>
            <button
              class="w-7 h-7 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center"
              @click="isMobileDrawerOpen = false"
            >
              ✕
            </button>
          </div>

          <!-- 抽屉内全局搜索按钮 -->
          <button
            class="w-full mb-4 px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-400 text-xs flex items-center justify-between hover:border-purple-400 hover:text-purple-600 transition-colors"
            @click="openSearchFromDrawer"
          >
            <span class="flex items-center gap-2">
              <span>🔍</span>
              <span>{{ t("nav.searchPlaceholder") }}</span>
            </span>
            <kbd
              class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono"
              >⌘K</kbd
            >
          </button>

          <!-- 导航菜单：只展示首页和分类页面跳转 -->
          <nav class="space-y-3">
            <router-link
              to="/"
              class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors"
              :class="
                isRouteActive('/')
                  ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              "
              @click="isMobileDrawerOpen = false"
            >
              <span class="text-base">🏠</span>
              <span>{{ t("sidebar.home") }}</span>
            </router-link>

            <!-- 技术分类大类标题 -->
            <div
              class="px-3 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500"
            >
              {{ t("sidebar.categories") }}
            </div>

            <!-- 分类页面独立跳转列表（不展开具体动画） -->
            <div class="space-y-1.5">
              <router-link
                v-for="cat in categoriesList"
                :key="cat.id"
                :to="'/category/' + cat.id"
                class="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                :class="
                  isCategoryActive(cat.id)
                    ? 'bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                "
                @click="isMobileDrawerOpen = false"
              >
                <div class="flex items-center gap-2.5 truncate">
                  <span class="text-base shrink-0">{{ cat.icon }}</span>
                  <span class="truncate">{{ t(cat.titleKey) }}</span>
                </div>
                <span
                  class="text-[10px] opacity-70 shrink-0 font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                >
                  {{ cat.moduleIds.length }}个模块
                </span>
              </router-link>
            </div>
          </nav>
        </div>

        <!-- 抽屉底部三个等大操作按钮 -->
        <div
          class="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-2"
        >
          <!-- 1. 语言切换 -->
          <button
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-xs font-bold"
            :title="t('nav.language')"
            @click="toggleLocaleQuick"
          >
            {{ currentLocale === "zh-CN" ? "中" : "EN" }}
          </button>
          <!-- 2. 主题切换 -->
          <button
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-sm"
            :title="t('nav.theme')"
            @click="toggleThemeQuick"
          >
            {{
              themeMode === "light" ? "☀️" : themeMode === "dark" ? "🌙" : "💻"
            }}
          </button>
          <!-- 3. GitHub -->
          <a
            href="https://github.com/teatang/candy-animation"
            target="_blank"
            rel="noopener noreferrer"
            class="h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-center text-sm"
            :title="t('app.github')"
          >
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path
                d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
              />
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
      <!-- 顶部 Logo 品牌区 & 搜索框 -->
      <div>
        <!-- 品牌区 -->
        <div
          class="border-b border-slate-100 dark:border-slate-800/80 mb-3"
          :class="
            isCollapsed
              ? 'py-3 flex flex-col items-center gap-2'
              : 'h-16 flex items-center justify-between px-1'
          "
        >
          <!-- Logo 与品牌名称 -->
          <el-tooltip
            :content="t('app.title')"
            placement="right"
            :disabled="!isCollapsed"
          >
            <router-link
              to="/"
              class="flex items-center gap-2.5 group overflow-hidden"
            >
              <div
                class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform shrink-0"
              >
                <span class="text-white text-lg font-black select-none"
                  >🍬</span
                >
              </div>
              <div
                v-show="!isCollapsed"
                class="flex flex-col truncate transition-opacity duration-200"
              >
                <div class="flex items-center gap-1.5">
                  <span
                    class="font-extrabold text-base tracking-tight bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent truncate"
                  >
                    {{ t("app.title") }}
                  </span>
                  <span
                    class="text-[9px] uppercase font-mono px-1 py-0.2 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/20"
                  >
                    v2.0
                  </span>
                </div>
                <span
                  class="text-[10px] text-slate-400 dark:text-slate-500 truncate"
                >
                  {{ t("app.subTitle") }}
                </span>
              </div>
            </router-link>
          </el-tooltip>

          <!-- 折叠 / 展开切换按钮 -->
          <el-tooltip
            ref="collapseTooltipRef"
            :content="isCollapsed ? t('sidebar.expand') : t('sidebar.collapse')"
            placement="right"
            :disabled="isCollapseTooltipDisabled"
            :hide-after="0"
          >
            <button
              class="rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 flex items-center justify-center outline-none"
              :class="isCollapsed ? 'w-8 h-8' : 'p-1.5'"
              @click="toggleCollapse"
              @mouseleave="isCollapseTooltipDisabled = false"
            >
              <span v-if="isCollapsed" class="text-xs">▶</span>
              <span v-else class="text-xs">◀</span>
            </button>
          </el-tooltip>
        </div>

        <!-- 全局动画搜索框 (展开为输入框样式的触发条，折叠为居中图标按钮) -->
        <div class="mb-3">
          <!-- 展开状态：带快捷键提示的搜索框 -->
          <button
            v-if="!isCollapsed"
            class="w-full flex items-center justify-between px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/60 text-slate-400 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 hover:bg-purple-50/20 transition-all text-xs group shadow-sm"
            @click="isSearchOpen = true"
          >
            <div class="flex items-center gap-2 truncate">
              <span class="text-sm">🔍</span>
              <span class="truncate">{{ t("nav.searchPlaceholder") }}</span>
            </div>
            <kbd
              class="px-1.5 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700/80 text-[10px] font-mono text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300"
            >
              Ctrl K
            </kbd>
          </button>

          <!-- 折叠状态：单个搜索图标按钮 -->
          <el-tooltip
            v-else
            :content="t('nav.searchButton') + ' (Ctrl+K)'"
            placement="right"
          >
            <button
              class="w-10 h-10 mx-auto rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
              @click="isSearchOpen = true"
            >
              <span>🔍</span>
            </button>
          </el-tooltip>
        </div>

        <!-- 导航列表区域：仅展示首页与分类独立页面 -->
        <nav
          class="space-y-2 overflow-y-auto max-h-[calc(100vh-230px)] pr-0.5 custom-scrollbar"
        >
          <!-- 首页入口 -->
          <el-tooltip
            :content="t('sidebar.home')"
            placement="right"
            :disabled="!isCollapsed"
          >
            <router-link
              to="/"
              class="flex items-center rounded-xl text-xs font-semibold transition-all group"
              :class="[
                isCollapsed
                  ? 'w-10 h-10 justify-center mx-auto'
                  : 'gap-2.5 px-3 py-2.5',
                isRouteActive('/')
                  ? 'bg-gradient-to-r from-purple-600/10 to-indigo-600/10 text-purple-600 dark:text-purple-400 font-bold border border-purple-500/20 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
              ]"
            >
              <span class="text-sm shrink-0">🏠</span>
              <span v-show="!isCollapsed" class="truncate">{{
                t("sidebar.home")
              }}</span>
            </router-link>
          </el-tooltip>

          <!-- 分类总标题 -->
          <div
            v-show="!isCollapsed"
            class="px-2 pt-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between"
          >
            <span>{{ t("sidebar.categories") }}</span>
            <span
              class="font-mono text-[9px] px-1 rounded bg-slate-100 dark:bg-slate-800"
            >
              {{ categoriesList.length }}
            </span>
          </div>

          <!-- 分类项列表 (仅跳转对应分类页面，不展示具体的子模块) -->
          <div class="space-y-1">
            <el-tooltip
              v-for="cat in categoriesList"
              :key="cat.id"
              :content="t(cat.titleKey) + ' (' + cat.moduleIds.length + ')'"
              placement="right"
              :disabled="!isCollapsed"
            >
              <router-link
                :to="'/category/' + cat.id"
                class="flex items-center rounded-xl text-xs transition-all group"
                :class="[
                  isCollapsed
                    ? 'w-10 h-10 justify-center mx-auto'
                    : 'justify-between px-3 py-2.5',
                  isCategoryActive(cat.id)
                    ? 'bg-purple-600/10 text-purple-600 dark:text-purple-300 font-bold border border-purple-500/30 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white',
                ]"
              >
                <div class="flex items-center gap-2.5 truncate">
                  <span class="text-sm shrink-0">{{ cat.icon }}</span>
                  <span
                    v-show="!isCollapsed"
                    class="truncate font-medium text-[11px] leading-tight"
                  >
                    {{ t(cat.titleKey) }}
                  </span>
                </div>
                <span
                  v-show="!isCollapsed"
                  class="text-[9px] font-mono opacity-70 shrink-0 ml-1 px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800"
                >
                  {{ cat.moduleIds.length }}
                </span>
              </router-link>
            </el-tooltip>
          </div>
        </nav>
      </div>

      <!-- 底部控制区：三个大小完全一致的按钮 (展开为 3 列等大，折叠为居中单列等大) -->
      <div class="pb-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <!-- 展开状态：3 个等大按钮并排网格 -->
        <div v-show="!isCollapsed" class="grid grid-cols-3 gap-2 w-full">
          <!-- 1. 语言切换 -->
          <el-tooltip :content="t('nav.language')" placement="top">
            <el-dropdown
              trigger="click"
              class="!w-full !flex !justify-center"
              @command="handleLocaleChange"
            >
              <button
                class="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-xs font-bold shadow-sm"
              >
                <span>{{ currentLocale === "zh-CN" ? "中" : "EN" }}</span>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    command="zh-CN"
                    :disabled="currentLocale === 'zh-CN'"
                  >
                    🇨🇳 简体中文
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="en-US"
                    :disabled="currentLocale === 'en-US'"
                  >
                    🇺🇸 English
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>

          <!-- 2. 主题切换 -->
          <el-tooltip :content="t('nav.theme')" placement="top">
            <el-dropdown
              trigger="click"
              class="!w-full !flex !justify-center"
              @command="handleThemeChange"
            >
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
                    <span class="mr-2">☀️</span>{{ t("theme.light") }}
                  </el-dropdown-item>
                  <el-dropdown-item command="dark">
                    <span class="mr-2">🌙</span>{{ t("theme.dark") }}
                  </el-dropdown-item>
                  <el-dropdown-item command="system">
                    <span class="mr-2">💻</span>{{ t("theme.system") }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>

          <!-- 3. GitHub 链接 -->
          <el-tooltip :content="t('app.github')" placement="top">
            <a
              href="https://github.com/teatang/candy-animation"
              target="_blank"
              rel="noopener noreferrer"
              class="h-10 w-full rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>
          </el-tooltip>
        </div>

        <!-- 折叠状态：3 个完全等大的 40x40 (w-10 h-10) 按钮居中垂直排列 -->
        <div
          v-show="isCollapsed"
          class="flex flex-col items-center gap-2 w-full"
        >
          <!-- 1. 语言切换 -->
          <el-tooltip :content="t('nav.language')" placement="right">
            <el-dropdown
              trigger="click"
              class="!flex !justify-center"
              @command="handleLocaleChange"
            >
              <button
                class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:border-purple-400 transition-colors flex items-center justify-center text-xs font-bold shadow-sm"
              >
                <span>{{ currentLocale === "zh-CN" ? "中" : "EN" }}</span>
              </button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    command="zh-CN"
                    :disabled="currentLocale === 'zh-CN'"
                  >
                    🇨🇳 简体中文
                  </el-dropdown-item>
                  <el-dropdown-item
                    command="en-US"
                    :disabled="currentLocale === 'en-US'"
                  >
                    🇺🇸 English
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>

          <!-- 2. 主题切换 -->
          <el-tooltip :content="t('nav.theme')" placement="right">
            <el-dropdown
              trigger="click"
              class="!flex !justify-center"
              @command="handleThemeChange"
            >
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
                    <span class="mr-2">☀️</span>{{ t("theme.light") }}
                  </el-dropdown-item>
                  <el-dropdown-item command="dark">
                    <span class="mr-2">🌙</span>{{ t("theme.dark") }}
                  </el-dropdown-item>
                  <el-dropdown-item command="system">
                    <span class="mr-2">💻</span>{{ t("theme.system") }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-tooltip>

          <!-- 3. GitHub 链接 -->
          <el-tooltip :content="t('app.github')" placement="right">
            <a
              href="https://github.com/teatang/candy-animation"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center justify-center text-sm shadow-sm"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                />
              </svg>
            </a>
          </el-tooltip>
        </div>
      </div>
    </aside>

    <!-- 全局动画搜索模态框 -->
    <GlobalSearchModal v-model="isSearchOpen" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import type { ThemeMode } from "@/types/animation";
import { useTheme } from "@/composables/useTheme";
import { persistLocale, type SupportedLocale } from "@/locales";
import { animationCategories } from "@/modules";
import GlobalSearchModal from "@/components/GlobalSearchModal.vue";

const route = useRoute();
const { t, locale } = useI18n();
const { themeMode, setTheme } = useTheme();

// 折叠状态 (桌面端)
const isCollapsed = ref<boolean>(false);
// 折叠按钮 Tooltip 控制 (点击后立即隐藏，移开后恢复)
const collapseTooltipRef = ref<any>(null);
const isCollapseTooltipDisabled = ref<boolean>(false);
// 抽屉状态 (移动端)
const isMobileDrawerOpen = ref<boolean>(false);
// 全局搜索弹窗状态
const isSearchOpen = ref<boolean>(false);

function toggleCollapse(e?: MouseEvent): void {
  isCollapseTooltipDisabled.value = true;
  isCollapsed.value = !isCollapsed.value;
  if (e?.currentTarget && typeof (e.currentTarget as HTMLElement).blur === "function") {
    (e.currentTarget as HTMLElement).blur();
  }
  collapseTooltipRef.value?.hide?.();
}

// 分类清单
const categoriesList = computed(() => animationCategories);

const currentLocale = computed(() => locale.value as SupportedLocale);

function isRouteActive(path: string): boolean {
  return route.path === path;
}

function isCategoryActive(catId: string): boolean {
  return route.path === `/category/${catId}`;
}

function openSearchFromDrawer(): void {
  isMobileDrawerOpen.value = false;
  isSearchOpen.value = true;
}

function handleLocaleChange(val: string): void {
  locale.value = val;
  persistLocale(val as SupportedLocale);
}

function toggleLocaleQuick(): void {
  const next = currentLocale.value === "zh-CN" ? "en-US" : "zh-CN";
  handleLocaleChange(next);
}

function handleThemeChange(val: string): void {
  setTheme(val as ThemeMode);
}

function toggleThemeQuick(): void {
  const modes: ThemeMode[] = ["light", "dark", "system"];
  const nextIdx = (modes.indexOf(themeMode.value) + 1) % modes.length;
  setTheme(modes[nextIdx]);
}

// 监听键盘快捷键 Ctrl+K / Cmd+K 唤醒全局搜索
function handleGlobalKeydown(e: KeyboardEvent): void {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    isSearchOpen.value = !isSearchOpen.value;
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleGlobalKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleGlobalKeydown);
});
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
