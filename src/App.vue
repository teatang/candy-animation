<template>
  <div class="min-h-screen flex flex-col bg-stage-light dark:bg-stage-dark text-slate-800 dark:text-slate-100 transition-colors duration-300">
    <!-- 顶部导航栏 -->
    <HeaderNav
      :modules="animationModules"
      :current-module-id="currentModuleId"
      @select-module="handleSelectModule"
    />

    <!-- 中央核心工作区 (包含舞台与解说卡片) -->
    <main class="flex-1 flex flex-col justify-between overflow-hidden relative">
      <!-- 虚拟摄影机动画舞台 -->
      <div class="flex-1 w-full relative flex items-center justify-center min-h-[480px]">
        <CameraStage :camera="camera">
          <component
            :is="currentStageComponent"
            ref="activeStageComponentRef"
          />
        </CameraStage>
      </div>

      <!-- 实时同步技术原理解说字幕卡片 -->
      <div class="w-full z-20">
        <SubtitleCard
          :current-step="currentStep"
          :total-steps="currentModule.steps.length"
        />
      </div>
    </main>

    <!-- 底部全功能播放控制器 -->
    <footer class="w-full sticky bottom-0 z-30">
      <PlaybackControls
        :steps="currentModule.steps"
        :current-step-index="currentStepIndex"
        :is-playing="isPlaying"
        :progress="progress"
        :current-time="currentTime"
        :total-duration="totalDuration"
        :playback-speed="playbackSpeed"
        @toggle-play="togglePlay"
        @prev-step="handlePrevStep"
        @next-step="handleNextStep"
        @reset="handleReset"
        @seek-progress="seekProgress"
        @seek-to-step="handleSeekToStep"
        @set-speed="setSpeed"
      />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { animationModules, DEFAULT_MODULE_ID, getModuleById } from '@/modules'
import type { AnimationModule } from '@/types/animation'
import { useCamera } from '@/composables/useCamera'
import { useGsapTimeline } from '@/composables/useGsapTimeline'
import HeaderNav from '@/components/HeaderNav.vue'
import CameraStage from '@/components/CameraStage.vue'
import PlaybackControls from '@/components/PlaybackControls.vue'
import SubtitleCard from '@/components/SubtitleCard.vue'
import HttpsHandshakeStage from '@/modules/https-handshake/HttpsHandshakeStage.vue'
import Md5AlgorithmStage from '@/modules/md5-algorithm/Md5AlgorithmStage.vue'

// 当前激活的模块 ID
const currentModuleId = ref<string>(DEFAULT_MODULE_ID)

// 当前模块对象
const currentModule = computed<AnimationModule>(() => {
  return getModuleById(currentModuleId.value) || animationModules[0]
})

// 动态对应的舞台组件
const currentStageComponent = computed(() => {
  return currentModuleId.value === 'https-handshake'
    ? HttpsHandshakeStage
    : Md5AlgorithmStage
})

// 舞台组件实例引用
const activeStageComponentRef = shallowRef<any>(null)

// 摄影机控制器
const camera = useCamera()

// GSAP 时间轴总播控器
const {
  isPlaying,
  progress,
  playbackSpeed,
  currentStepIndex,
  currentStep,
  totalDuration,
  currentTime,
  initTimeline,
  play,
  pause,
  togglePlay,
  reset,
  seekToStep,
  prevStep,
  nextStep,
  seekProgress,
  setSpeed,
} = useGsapTimeline()

/**
 * 切换动画模块
 */
async function handleSelectModule(moduleId: string): Promise<void> {
  if (currentModuleId.value === moduleId) return
  pause()
  currentModuleId.value = moduleId
  camera.resetCamera(0.5)

  await nextTick()
  initCurrentAnimation()
}

/**
 * 初始化当前激活模块的动画时间轴与摄影机联动
 */
function initCurrentAnimation(): void {
  if (!activeStageComponentRef.value) return

  const tl = activeStageComponentRef.value.initAnimation?.(camera, (stepIdx: number) => {
    // 步骤变更回调
  })

  if (tl) {
    initTimeline(tl, currentModule.value.steps)
  }
}

function handleSeekToStep(idx: number): void {
  seekToStep(idx)
  const stepMeta = currentModule.value.steps[idx]
  if (stepMeta?.camera) {
    camera.animateTo(stepMeta.camera, 0.8)
  }
}

function handlePrevStep(): void {
  prevStep()
  const stepMeta = currentModule.value.steps[currentStepIndex.value]
  if (stepMeta?.camera) {
    camera.animateTo(stepMeta.camera, 0.8)
  }
}

function handleNextStep(): void {
  nextStep()
  const stepMeta = currentModule.value.steps[currentStepIndex.value]
  if (stepMeta?.camera) {
    camera.animateTo(stepMeta.camera, 0.8)
  }
}

function handleReset(): void {
  reset()
  camera.resetCamera()
}

// 键盘快捷键支持 (空格暂停/播放，左右方向键单步步进，R 重置)
function handleKeydown(e: KeyboardEvent): void {
  if ((e.target as HTMLElement).tagName === 'INPUT') return

  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  } else if (e.code === 'ArrowLeft') {
    e.preventDefault()
    handlePrevStep()
  } else if (e.code === 'ArrowRight') {
    e.preventDefault()
    handleNextStep()
  } else if (e.key === 'r' || e.key === 'R') {
    e.preventDefault()
    handleReset()
  }
}

onMounted(async () => {
  window.addEventListener('keydown', handleKeydown)
  await nextTick()
  initCurrentAnimation()
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>
