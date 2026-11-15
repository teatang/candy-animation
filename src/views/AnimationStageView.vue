<template>
  <div class="flex-1 flex flex-col justify-between overflow-hidden relative">
    <!-- 顶部左侧快捷操作胶囊 (Mermaid 原理图 / 架构时序图，默认不展示，可点击查看) -->
    <div class="absolute top-4 left-4 z-30 flex items-center gap-2">
      <el-tooltip
        :content="isZh ? '查看当前动画的 Mermaid 架构时序图 / 流程图' : 'View Mermaid Architecture Diagram'"
        placement="bottom-start"
      >
        <button
          class="mermaid-btn px-3.5 py-2 rounded-xl border border-purple-500/30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:border-purple-500 hover:text-purple-600 dark:hover:text-purple-400 text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/25 transition-all active:scale-95 group"
          @click="isMermaidModalOpen = true"
        >
          <span class="text-sm group-hover:scale-110 transition-transform">📊</span>
          <span>{{ isZh ? 'Mermaid 原理图' : 'Mermaid Diagram' }}</span>
          <span class="text-[10px] px-1.5 py-0.2 rounded font-mono font-bold bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-300 border border-purple-500/20">
            查看
          </span>
        </button>
      </el-tooltip>
    </div>

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
        @open-mermaid="isMermaidModalOpen = true"
      />
    </footer>

    <!-- Mermaid 架构原理图弹窗 (默认不展示，用户选择查看) -->
    <MermaidModal
      v-model="isMermaidModalOpen"
      :module-id="props.moduleId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, shallowRef, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { getModuleById, animationModules } from '@/modules'
import type { AnimationModule } from '@/types/animation'
import { useCamera } from '@/composables/useCamera'
import { useGsapTimeline } from '@/composables/useGsapTimeline'
import CameraStage from '@/components/CameraStage.vue'
import PlaybackControls from '@/components/PlaybackControls.vue'
import SubtitleCard from '@/components/SubtitleCard.vue'
import MermaidModal from '@/components/MermaidModal.vue'
import HttpsHandshakeStage from '@/modules/https-handshake/HttpsHandshakeStage.vue'
import Md5AlgorithmStage from '@/modules/md5-algorithm/Md5AlgorithmStage.vue'
import WebsocketProtocolStage from '@/modules/websocket-protocol/WebsocketProtocolStage.vue'
import TcpIpProtocolStage from '@/modules/tcp-ip-protocol/TcpIpProtocolStage.vue'
import Sha256AlgorithmStage from '@/modules/sha256-algorithm/Sha256AlgorithmStage.vue'
import TcpHandshakeWaveStage from '@/modules/tcp-handshake-wave/TcpHandshakeWaveStage.vue'

const props = defineProps<{
  moduleId: string
}>()

const route = useRoute()
const router = useRouter()
const { locale } = useI18n()

// 是否中文模式
const isZh = computed(() => locale.value === 'zh-CN')

// Mermaid 图表模态框显示状态 (默认关闭，用户自主选择查看)
const isMermaidModalOpen = ref<boolean>(false)

// 当前模块元数据
const currentModule = computed<AnimationModule>(() => {
  return getModuleById(props.moduleId) || animationModules[0]
})

// 动态对应的舞台组件
const currentStageComponent = computed(() => {
  switch (props.moduleId) {
    case 'https-handshake':
      return HttpsHandshakeStage
    case 'md5-algorithm':
      return Md5AlgorithmStage
    case 'websocket-protocol':
      return WebsocketProtocolStage
    case 'tcp-ip-protocol':
      return TcpIpProtocolStage
    case 'sha256-algorithm':
      return Sha256AlgorithmStage
    case 'tcp-handshake-wave':
      return TcpHandshakeWaveStage
    default:
      return HttpsHandshakeStage
  }
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
 * 监听步骤变化，同步更新 URL query 中的 ?step=N 参数
 * 使得用户在任意步骤复制链接，其他人均能直接直达对应步骤
 */
watch(currentStepIndex, (newIdx) => {
  const targetStep = newIdx + 1
  if (route.query.step !== String(targetStep)) {
    router.replace({
      query: {
        ...route.query,
        step: targetStep,
      },
    })
  }
})

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

    // 若 URL 携带了 ?step=N，直接跳转到对应步骤
    const queryStep = parseInt(route.query.step as string, 10)
    if (!isNaN(queryStep) && queryStep >= 1 && queryStep <= currentModule.value.steps.length) {
      handleSeekToStep(queryStep - 1)
    }
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
  pause()
})
</script>
