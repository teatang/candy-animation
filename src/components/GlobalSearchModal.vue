<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/60 dark:bg-black/75 backdrop-blur-sm transition-opacity duration-200"
      @click.self="close"
    >
      <div
        class="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh] transition-all transform animate-in fade-in zoom-in-95 duration-150"
      >
        <!-- 搜索输入框 -->
        <div class="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 gap-3">
          <span class="text-slate-400 text-lg">🔍</span>
          <input
            ref="searchInputRef"
            v-model="query"
            type="text"
            class="flex-1 bg-transparent border-0 outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 text-sm sm:text-base"
            :placeholder="t('search.placeholder')"
            @keydown.down.prevent="navigateResults(1)"
            @keydown.up.prevent="navigateResults(-1)"
            @keydown.enter.prevent="selectActiveResult"
            @keydown.esc.prevent="close"
          />
          <button
            v-if="query"
            class="text-xs px-2 py-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            @click="query = ''"
          >
            ✕
          </button>
          <kbd
            class="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-300 dark:border-slate-700"
          >
            ESC
          </kbd>
        </div>

        <!-- 搜索结果列表 -->
        <div class="overflow-y-auto p-2 space-y-1 flex-1 custom-scrollbar">
          <!-- 结果为空提示 -->
          <div
            v-if="query.trim() && searchResults.length === 0"
            class="py-12 px-4 text-center text-slate-400 dark:text-slate-500"
          >
            <div class="text-3xl mb-2">🔭</div>
            <p class="text-sm font-medium text-slate-600 dark:text-slate-400">
              {{ t('search.noResults') }}
            </p>
            <p class="text-xs mt-1.5 opacity-80">
              {{ t('search.noResultsHint') }}
            </p>
          </div>

          <!-- 尚未输入时的推荐提示 -->
          <div
            v-else-if="!query.trim()"
            class="py-6 px-4 space-y-3"
          >
            <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {{ t('categoryPage.allCategories') }}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                v-for="cat in animationCategories"
                :key="cat.id"
                class="flex items-center gap-3 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 hover:border-purple-400 hover:bg-purple-50/50 dark:hover:bg-purple-950/20 text-left transition-all group"
                @click="goToCategory(cat.id)"
              >
                <span class="text-2xl">{{ cat.icon }}</span>
                <div class="truncate">
                  <div class="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-300 truncate">
                    {{ t(cat.titleKey) }}
                  </div>
                  <div class="text-[10px] text-slate-400 truncate">
                    {{ cat.moduleIds.length }} 个动画模块
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- 搜索结果列表项 -->
          <div
            v-for="(item, idx) in searchResults"
            :key="item.id + '-' + idx"
            class="flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors"
            :class="activeIndex === idx ? 'bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-200 ring-1 ring-purple-500/40' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'"
            @mouseenter="activeIndex = idx"
            @click="handleSelect(item)"
          >
            <div class="flex items-center gap-3 min-w-0 pr-2">
              <span class="text-xl shrink-0">{{ item.icon }}</span>
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold truncate">
                    {{ item.title }}
                  </span>
                  <span
                    class="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold shrink-0 uppercase"
                    :class="item.type === 'category' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' : item.type === 'step' ? 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300' : 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'"
                  >
                    {{ item.typeLabel }}
                  </span>
                </div>
                <p class="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {{ item.subtitle }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-2 shrink-0">
              <span
                v-if="item.badge"
                class="hidden sm:inline-block text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {{ item.badge }}
              </span>
              <span class="text-xs opacity-60">→</span>
            </div>
          </div>
        </div>

        <!-- 底部快捷键提示栏 -->
        <div class="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1">
              <kbd class="px-1 rounded bg-slate-200 dark:bg-slate-700 text-[9px] font-mono">↑</kbd>
              <kbd class="px-1 rounded bg-slate-200 dark:bg-slate-700 text-[9px] font-mono">↓</kbd>
              <span>{{ t('search.navigateHint') }}</span>
            </span>
            <span class="flex items-center gap-1">
              <kbd class="px-1 rounded bg-slate-200 dark:bg-slate-700 text-[9px] font-mono">↵</kbd>
              <span>{{ t('search.selectHint') }}</span>
            </span>
          </div>
          <span v-if="query.trim()" class="font-mono text-[10px]">
            {{ t('search.resultsCount', { count: searchResults.length }) }}
          </span>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { animationModules, animationCategories } from '@/modules'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()
const { t } = useI18n()

const query = ref('')
const activeIndex = ref(0)
const searchInputRef = ref<HTMLInputElement | null>(null)

interface SearchItem {
  id: string
  title: string
  subtitle: string
  icon: string
  type: 'category' | 'module' | 'step'
  typeLabel: string
  badge?: string
  targetUrl: string
}

// 自动聚焦
watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      activeIndex.value = 0
      nextTick(() => {
        searchInputRef.value?.focus()
      })
    } else {
      query.value = ''
    }
  }
)

// 重置选中序号
watch(query, () => {
  activeIndex.value = 0
})

const searchResults = computed<SearchItem[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return []

  const results: SearchItem[] = []

  // 1. 匹配分类
  for (const cat of animationCategories) {
    const title = t(cat.titleKey)
    const desc = t(cat.descriptionKey)
    if (
      cat.id.toLowerCase().includes(q) ||
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q)
    ) {
      results.push({
        id: `cat-${cat.id}`,
        title,
        subtitle: desc,
        icon: cat.icon,
        type: 'category',
        typeLabel: t('search.typeCategory'),
        targetUrl: `/category/${cat.id}`,
      })
    }
  }

  // 2. 匹配模块
  for (const mod of animationModules) {
    const title = t(mod.titleKey)
    const summary = t(mod.summaryKey)
    const categoryName = t(mod.categoryKey)
    const isModMatch =
      mod.id.toLowerCase().includes(q) ||
      title.toLowerCase().includes(q) ||
      summary.toLowerCase().includes(q) ||
      categoryName.toLowerCase().includes(q)

    if (isModMatch) {
      results.push({
        id: `mod-${mod.id}`,
        title,
        subtitle: summary,
        icon: '🎬',
        type: 'module',
        typeLabel: t('search.typeModule'),
        badge: categoryName,
        targetUrl: `/${mod.id}`,
      })
    }

    // 3. 匹配模块下的关键步骤
    for (const step of mod.steps) {
      const stepTitle = t(step.titleKey)
      const stepDesc = t(step.descriptionKey)
      const badge = step.badgeKey ? t(step.badgeKey) : `Step ${step.stepNumber}`
      const isStepMatch =
        stepTitle.toLowerCase().includes(q) ||
        stepDesc.toLowerCase().includes(q) ||
        badge.toLowerCase().includes(q) ||
        `step ${step.stepNumber}`.includes(q) ||
        `第${step.stepNumber}步`.includes(q)

      if (isStepMatch) {
        results.push({
          id: `step-${mod.id}-${step.id}`,
          title: `${title} - #${step.stepNumber} ${stepTitle}`,
          subtitle: stepDesc.replace(/<[^>]*>/g, ''), // 去除 html 标签
          icon: '📍',
          type: 'step',
          typeLabel: t('search.typeStep'),
          badge: badge,
          targetUrl: `/${mod.id}?step=${step.stepNumber}`,
        })
      }
    }
  }

  return results
})

function close(): void {
  emit('update:modelValue', false)
}

function navigateResults(delta: number): void {
  if (searchResults.value.length === 0) return
  const len = searchResults.value.length
  activeIndex.value = (activeIndex.value + delta + len) % len
}

function selectActiveResult(): void {
  if (searchResults.value.length === 0) return
  const active = searchResults.value[activeIndex.value]
  if (active) {
    handleSelect(active)
  }
}

function handleSelect(item: SearchItem): void {
  router.push(item.targetUrl)
  close()
}

function goToCategory(categoryId: string): void {
  router.push(`/category/${categoryId}`)
  close()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(148, 163, 184, 0.4);
  border-radius: 9999px;
}
</style>
