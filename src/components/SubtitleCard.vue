<template>
  <div
    v-if="currentStep"
    class="w-full max-w-4xl mx-auto px-4 py-3"
  >
    <div
      class="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-xl transition-all duration-300"
    >
      <!-- 头部：阶段指示与徽章 -->
      <div class="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-2.5 mb-2.5">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 rounded-md text-[11px] font-bold font-mono bg-purple-100 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 border border-purple-500/20">
            {{ t('playback.stepMarker', { step: currentStep.stepNumber }) }} / {{ totalSteps }}
          </span>
          <span
            v-if="currentStep.badgeKey"
            class="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-cyan-100 dark:bg-cyan-950/70 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20"
          >
            {{ t(currentStep.badgeKey) }}
          </span>
          <h2 class="font-bold text-sm md:text-base text-slate-800 dark:text-slate-100">
            {{ t(currentStep.titleKey) }}
          </h2>
        </div>

        <!-- 阶段圆点指示 -->
        <div class="hidden sm:flex items-center gap-1">
          <span
            v-for="s in totalSteps"
            :key="s"
            class="w-2 h-2 rounded-full transition-all"
            :class="
              s === currentStep.stepNumber
                ? 'w-5 bg-purple-600'
                : s < currentStep.stepNumber
                ? 'bg-purple-400 dark:bg-purple-700'
                : 'bg-slate-300 dark:bg-slate-700'
            "
          ></span>
        </div>
      </div>

      <!-- 正文解说（支持 HTML 格式如 <code>、公式等） -->
      <div
        class="text-xs md:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans prose dark:prose-invert max-w-none"
        v-html="t(currentStep.descriptionKey)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { AnimationStep } from '@/types/animation'

defineProps<{
  currentStep: AnimationStep | null
  totalSteps: number
}>()

const { t } = useI18n()
</script>

<style>
/* 解说词内部 code 标签高亮 */
.prose code {
  color: #06b6d4;
  background-color: rgba(6, 182, 212, 0.1);
  padding: 0.15rem 0.35rem;
  border-radius: 0.375rem;
  font-family: var(--font-mono, monospace);
  font-size: 0.85em;
  font-weight: 600;
}
.dark .prose code {
  color: #38bdf8;
  background-color: rgba(56, 189, 248, 0.15);
}
</style>
