<template>
  <div ref="containerRef" class="w-full min-h-screen flex flex-col justify-between overflow-x-hidden relative">
    <!-- 顶部柔和渐变背景光晕 -->
    <div
      class="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-20 dark:opacity-30 blur-3xl rounded-full"
      :style="{ background: `radial-gradient(circle, ${categoryData?.color || '#a855f7'} 0%, transparent 70%)` }"
    ></div>

    <!-- 主要内容容器 -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 flex flex-col gap-8">
      <!-- 1. 面包屑与顶部导航 -->
      <nav class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <router-link to="/" class="hover:text-purple-600 dark:hover:text-purple-400 transition-colors flex items-center gap-1">
          <span>🏠</span>
          <span>{{ t('categoryPage.breadcrumbHome') }}</span>
        </router-link>
        <span>/</span>
        <span class="text-slate-400 dark:text-slate-500">{{ t('categoryPage.breadcrumbCategories') }}</span>
        <span>/</span>
        <span class="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
          <span>{{ categoryData?.icon }}</span>
          <span>{{ categoryData ? t(categoryData.titleKey) : categoryId }}</span>
        </span>
      </nav>

      <!-- 2. 分类头部 Hero 区域 -->
      <section v-if="categoryData" class="category-hero flex flex-col items-start gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-8">
        <div class="flex items-center gap-4">
          <div
            class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center text-3xl sm:text-4xl shadow-xl transition-transform hover:scale-105"
            :style="{
              background: `linear-gradient(135deg, ${categoryData.color}33, ${categoryData.color}11)`,
              border: `1.5px solid ${categoryData.color}66`
            }"
          >
            <span>{{ categoryData.icon }}</span>
          </div>
          <div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold mb-2 border border-purple-500/20 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-300">
              <span class="w-1.5 h-1.5 rounded-full" :style="{ backgroundColor: categoryData.color }"></span>
              <span>ID: {{ categoryData.id }}</span>
            </div>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-800 dark:text-slate-100 tracking-tight">
              {{ t(categoryData.titleKey) }}
            </h1>
          </div>
        </div>

        <p class="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
          {{ t(categoryData.descriptionKey) }}
        </p>

        <!-- 关键数据徽章 -->
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <div class="px-3.5 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span class="text-base">📦</span>
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {{ t('categoryPage.modulesCount', { count: categoryData.modules.length }) }}
            </span>
          </div>

          <div class="px-3.5 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span class="text-base">🪜</span>
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {{ t('categoryPage.stepsCount', { count: totalStepsCount }) }}
            </span>
          </div>

          <div class="px-3.5 py-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-md flex items-center gap-2 shadow-sm">
            <span class="text-base">⏱️</span>
            <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {{ t('categoryPage.totalDuration', { sec: totalDuration }) }}
            </span>
          </div>
        </div>
      </section>

      <!-- 3. 分类快速切换 Tab 栏 -->
      <section class="category-tabs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="text-xs font-bold text-slate-500 dark:text-slate-400">
          {{ t('categoryPage.switchCategory') }}
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <router-link
            v-for="cat in allCategories"
            :key="cat.id"
            :to="'/category/' + cat.id"
            class="px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 border"
            :class="cat.id === categoryId
              ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-600/20 font-bold scale-105'
              : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300'"
          >
            <span>{{ cat.icon }}</span>
            <span>{{ t(cat.titleKey) }}</span>
            <span
              class="px-1.5 py-0.2 rounded text-[10px] font-mono"
              :class="cat.id === categoryId ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'"
            >
              {{ cat.moduleIds.length }}
            </span>
          </router-link>
        </div>
      </section>

      <!-- 4. 动画模块网格展示 -->
      <section class="space-y-4">
        <div class="text-xs font-medium text-slate-500 dark:text-slate-400">
          {{ t('categoryPage.explorePrompt') }}
        </div>

        <!-- 动画卡片网格 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="mod in categoryData?.modules"
            :key="mod.id"
            class="category-module-card p-6 rounded-3xl border border-slate-200/90 dark:border-slate-800/90 bg-white/85 dark:bg-slate-900/85 backdrop-blur-md shadow-sm hover:shadow-xl hover:border-purple-500/60 transition-all duration-300 flex flex-col justify-between group"
          >
            <div class="space-y-3.5">
              <!-- 卡片顶部分类与时长标签 -->
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span
                    class="w-3 h-3 rounded-full"
                    :style="{ backgroundColor: mod.categoryColor }"
                  ></span>
                  <span class="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {{ t(mod.categoryKey) }}
                  </span>
                </div>
                <span class="px-2.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  {{ t('home.totalDuration', { sec: mod.totalDuration }) }}
                </span>
              </div>

              <!-- 模块标题与描述 -->
              <div>
                <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {{ t(mod.titleKey) }}
                </h3>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-2">
                  {{ t(mod.summaryKey) }}
                </p>
              </div>

              <!-- 步骤快速直达深链 -->
              <div class="space-y-1.5 pt-1">
                <span class="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  {{ t('home.stepsCount', { count: mod.steps.length }) }}：
                </span>
                <div class="flex flex-wrap gap-1.5">
                  <router-link
                    v-for="step in mod.steps"
                    :key="step.id"
                    :to="`/${mod.id}?step=${step.stepNumber}`"
                    class="px-2.5 py-1 rounded-lg text-[10px] font-mono border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 hover:border-purple-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                    :title="t(step.titleKey)"
                  >
                    #{{ step.stepNumber }} {{ step.badgeKey ? t(step.badgeKey) : `Step ${step.stepNumber}` }}
                  </router-link>
                </div>
              </div>
            </div>

            <!-- 卡片底部操作按钮栏 -->
            <div class="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <!-- 查看 Mermaid 图谱按钮 -->
              <button
                class="px-3 py-1.5 rounded-xl border border-purple-500/30 bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                @click="openModuleMermaid(mod.id)"
              >
                <span>📊</span>
                <span>{{ isZh ? 'Mermaid 原理图' : 'Mermaid Diagram' }}</span>
              </button>

              <router-link
                :to="'/' + mod.id"
                class="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-purple-600/20"
              >
                <span>{{ t('home.launchModule') }}</span>
                <span>→</span>
              </router-link>
            </div>
          </div>
        </div>

        <!-- 空分类状态 -->
        <div
          v-if="!categoryData || categoryData.modules.length === 0"
          class="p-12 text-center rounded-3xl border border-dashed border-slate-300 dark:border-slate-700 text-slate-400"
        >
          <span class="text-4xl mb-2 block">📭</span>
          <p class="text-sm font-medium">{{ t('categoryPage.noModules') }}</p>
        </div>
      </section>
    </div>

    <!-- Mermaid 原理图谱模态框 (默认不展示，点击后查看) -->
    <MermaidModal
      v-model="isMermaidModalOpen"
      :module-id="activeMermaidModuleId"
    />

    <!-- 底部版权栏 -->
    <footer class="w-full py-6 text-center text-xs text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
      <span>🍬 糖果动画 (Candy Animation) &copy; 2026. Released under MIT License.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { getCategoryWithModules, animationCategories } from '@/modules'
import MermaidModal from '@/components/MermaidModal.vue'

const props = defineProps<{
  categoryId: string
}>()

const router = useRouter()
const { t, locale } = useI18n()
const isZh = computed(() => locale.value === 'zh-CN')

// Mermaid 图表模态框控制
const isMermaidModalOpen = ref<boolean>(false)
const activeMermaidModuleId = ref<string>('tcp-handshake-wave')

function openModuleMermaid(moduleId: string): void {
  activeMermaidModuleId.value = moduleId
  isMermaidModalOpen.value = true
}

const containerRef = ref<HTMLElement | null>(null)
const allCategories = animationCategories

const categoryData = computed(() => {
  return getCategoryWithModules(props.categoryId)
})

const totalStepsCount = computed(() => {
  if (!categoryData.value) return 0
  return categoryData.value.modules.reduce((sum, mod) => sum + mod.steps.length, 0)
})

const totalDuration = computed(() => {
  if (!categoryData.value) return 0
  return categoryData.value.modules.reduce((sum, mod) => sum + mod.totalDuration, 0)
})

function runEntranceAnimation(): void {
  if (!containerRef.value) return
  const q = gsap.utils.selector(containerRef.value)
  const hero = q('.category-hero')
  const tabs = q('.category-tabs')
  const cards = q('.category-module-card')

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
  if (hero.length) {
    tl.fromTo(hero, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 })
  }
  if (tabs.length) {
    tl.fromTo(tabs, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')
  }
  if (cards.length) {
    tl.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.98 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.6 },
      '-=0.2'
    )
  }
}

watch(
  () => props.categoryId,
  (newId) => {
    const found = getCategoryWithModules(newId)
    if (!found) {
      router.replace('/')
      return
    }
    runEntranceAnimation()
  }
)

onMounted(() => {
  if (!categoryData.value) {
    router.replace('/')
    return
  }
  runEntranceAnimation()
})
</script>
