<template>
  <div
    class="w-full border-t border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-4 sm:px-6 py-3 flex flex-col gap-2.5 z-30 shadow-lg"
  >
    <!-- 上层：阶段指示胶囊与时间显示 -->
    <div class="flex items-center justify-between gap-2 overflow-x-auto pb-1">
      <!-- 步骤选择胶囊按钮 -->
      <div class="flex items-center gap-1.5 flex-nowrap">
        <button
          v-for="(step, idx) in steps"
          :key="step.id"
          class="px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 border"
          :class="
            currentStepIndex === idx
              ? 'bg-purple-600 text-white border-purple-600 shadow-sm shadow-purple-500/30'
              : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 hover:border-purple-400'
          "
          @click="$emit('seekToStep', idx)"
        >
          <span class="w-1.5 h-1.5 rounded-full" :class="currentStepIndex === idx ? 'bg-white' : 'bg-slate-400'"></span>
          <span>{{ t('playback.stepMarker', { step: idx + 1 }) }}: {{ t(step.badgeKey || step.titleKey) }}</span>
        </button>
      </div>

      <!-- 时间刻度显示 -->
      <div class="font-mono text-xs text-slate-500 dark:text-slate-400 font-semibold whitespace-nowrap">
        {{ formatTime(currentTime) }} / {{ formatTime(totalDuration) }}
      </div>
    </div>

    <!-- 中层：进度条拖拽 (Scrubber) -->
    <div class="w-full px-1">
      <el-slider
        :model-value="sliderValue"
        :min="0"
        :max="100"
        :step="0.1"
        :show-tooltip="false"
        class="!my-0"
        @input="handleSliderInput"
      />
    </div>

    <!-- 下层：核心播放控制台按键区 -->
    <div class="flex items-center justify-between gap-4">
      <!-- 播放/暂停/快进控制按键组 -->
      <div class="flex items-center gap-2">
        <!-- 重置 -->
        <button
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
          :title="t('playback.reset')"
          @click="$emit('reset')"
        >
          <span class="text-sm">↺</span>
        </button>

        <!-- 上一步 -->
        <button
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-40"
          :disabled="currentStepIndex <= 0"
          :title="t('playback.prevStep')"
          @click="$emit('prevStep')"
        >
          <span class="text-sm">⏮</span>
        </button>

        <!-- 播放 / 暂停主按钮 -->
        <button
          class="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-sm shadow-md shadow-purple-500/25 hover:from-purple-500 hover:to-indigo-500 active:scale-95 transition-all flex items-center gap-2"
          @click="$emit('togglePlay')"
        >
          <span class="text-base">{{ isPlaying ? '⏸' : '▶' }}</span>
          <span>{{ isPlaying ? t('playback.pause') : t('playback.play') }}</span>
        </button>

        <!-- 下一步 -->
        <button
          class="p-2 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors disabled:opacity-40"
          :disabled="currentStepIndex >= steps.length - 1"
          :title="t('playback.nextStep')"
          @click="$emit('nextStep')"
        >
          <span class="text-sm">⏭</span>
        </button>
      </div>

      <!-- 右侧倍速选择 -->
      <div class="flex items-center gap-2">
        <span class="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-semibold">
          {{ t('playback.speed') }}:
        </span>
        <div class="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <button
            v-for="s in speedOptions"
            :key="s"
            class="px-2 py-1 rounded text-xs font-mono font-bold transition-all"
            :class="
              playbackSpeed === s
                ? 'bg-white dark:bg-slate-700 text-purple-600 dark:text-purple-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            "
            @click="$emit('setSpeed', s)"
          >
            {{ s }}x
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { AnimationStep, PlaybackSpeed } from '@/types/animation'

const props = defineProps<{
  steps: AnimationStep[]
  currentStepIndex: number
  isPlaying: boolean
  progress: number
  currentTime: number
  totalDuration: number
  playbackSpeed: PlaybackSpeed
}>()

const emit = defineEmits<{
  (e: 'togglePlay'): void
  (e: 'prevStep'): void
  (e: 'nextStep'): void
  (e: 'reset'): void
  (e: 'seekProgress', progress: number): void
  (e: 'seekToStep', index: number): void
  (e: 'setSpeed', speed: PlaybackSpeed): void
}>()

const { t } = useI18n()

const speedOptions: PlaybackSpeed[] = [0.5, 1, 1.5, 2]

const sliderValue = computed(() => Number((props.progress * 100).toFixed(1)))

function handleSliderInput(val: number | number[]): void {
  const numeric = typeof val === 'number' ? val : val[0]
  emit('seekProgress', numeric / 100)
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = (seconds % 60).toFixed(1)
  const minStr = mins < 10 ? `0${mins}` : `${mins}`
  const secStr = Number(secs) < 10 ? `0${secs}` : `${secs}`
  return `${minStr}:${secStr}`
}
</script>
