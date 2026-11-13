import { ref, shallowRef, computed, onUnmounted, getCurrentInstance } from 'vue'
import gsap from 'gsap'
import type { PlaybackSpeed, PlaybackState, AnimationStep } from '@/types/animation'

/**
 * GSAP 时间轴总控制器 Composable (useGsapTimeline)
 * 提供对主动画时间轴的精准播控、步骤跳转、倍速调整及状态驱动
 */
export function useGsapTimeline() {
  // GSAP 核心时间轴实例 (使用 shallowRef 避免深层响应式开销)
  const timeline = shallowRef<gsap.core.Timeline | null>(null)

  // 播放状态: 'idle' | 'playing' | 'paused' | 'completed'
  const playbackState = ref<PlaybackState>('idle')

  // 当前时间轴进度 (0.0 ~ 1.0)
  const progress = ref<number>(0)

  // 当前播放速率
  const playbackSpeed = ref<PlaybackSpeed>(1)

  // 当前激活的步骤索引 (从 0 开始)
  const currentStepIndex = ref<number>(0)

  // 步骤时间点映射表 (记录每个 step 在时间轴上的起始绝对时间)
  const stepTimeOffsets = ref<number[]>([])

  // 步骤列表引用
  const stepsList = ref<AnimationStep[]>([])

  /**
   * 是否正在播放
   */
  const isPlaying = computed(() => playbackState.value === 'playing')

  /**
   * 当前总时长 (秒)
   */
  const totalDuration = computed(() => timeline.value?.duration() || 0)

  /**
   * 当前播放秒数
   */
  const currentTime = computed(() => (timeline.value ? timeline.value.time() : 0))

  /**
   * 当前步骤信息
   */
  const currentStep = computed(() => {
    return stepsList.value[currentStepIndex.value] || null
  })

  /**
   * 初始化时间轴
   * @param tl 由具体动画模块构建的 gsap.core.Timeline 实例
   * @param steps 该动画模块定义的步骤数组
   */
  function initTimeline(tl: gsap.core.Timeline, steps: AnimationStep[]): void {
    // 销毁旧实例
    if (timeline.value) {
      timeline.value.kill()
    }

    stepsList.value = steps
    timeline.value = tl

    // 计算每个步骤的起始时间点
    let accumTime = 0
    const offsets: number[] = []
    steps.forEach((s) => {
      offsets.push(accumTime)
      accumTime += s.duration
    })
    stepTimeOffsets.value = offsets

    // 暂停初始状态，设定速率
    tl.timeScale(playbackSpeed.value)
    tl.pause(0)
    playbackState.value = 'idle'
    progress.value = 0
    currentStepIndex.value = 0

    // 注册时间轴更新回调
    tl.eventCallback('onUpdate', () => {
      const p = tl.progress()
      progress.value = Number(p.toFixed(4))

      const t = tl.time()
      // 计算当前所处的步骤
      let activeIndex = 0
      for (let i = offsets.length - 1; i >= 0; i--) {
        if (t >= offsets[i] - 0.05) {
          activeIndex = i
          break
        }
      }
      currentStepIndex.value = activeIndex
    })

    // 播放完成回调
    tl.eventCallback('onComplete', () => {
      playbackState.value = 'completed'
      progress.value = 1
      currentStepIndex.value = steps.length - 1
    })
  }

  /**
   * 播放
   */
  function play(): void {
    if (!timeline.value) return
    if (playbackState.value === 'completed') {
      timeline.value.restart()
    } else {
      timeline.value.play()
    }
    playbackState.value = 'playing'
  }

  /**
   * 暂停
   */
  function pause(): void {
    if (!timeline.value) return
    timeline.value.pause()
    playbackState.value = 'paused'
  }

  /**
   * 播放 / 暂停切换
   */
  function togglePlay(): void {
    if (isPlaying.value) {
      pause()
    } else {
      play()
    }
  }

  /**
   * 重置时间轴回到起始点
   */
  function reset(): void {
    if (!timeline.value) return
    timeline.value.pause(0)
    playbackState.value = 'idle'
    progress.value = 0
    currentStepIndex.value = 0
  }

  /**
   * 跳转至指定步骤
   * @param stepIndex 步骤索引 (0 ~ steps.length - 1)
   */
  function seekToStep(stepIndex: number): void {
    if (!timeline.value || stepIndex < 0 || stepIndex >= stepsList.value.length) return
    const targetTime = stepTimeOffsets.value[stepIndex] ?? 0
    timeline.value.seek(targetTime)
    currentStepIndex.value = stepIndex
    progress.value = Number(timeline.value.progress().toFixed(4))
    if (playbackState.value === 'completed') {
      playbackState.value = 'paused'
    }
  }

  /**
   * 上一步
   */
  function prevStep(): void {
    if (currentStepIndex.value > 0) {
      seekToStep(currentStepIndex.value - 1)
    } else {
      seekToStep(0)
    }
  }

  /**
   * 下一步
   */
  function nextStep(): void {
    if (currentStepIndex.value < stepsList.value.length - 1) {
      seekToStep(currentStepIndex.value + 1)
    } else {
      // 已经是最后一步，直接跳到末尾
      if (timeline.value) {
        timeline.value.seek(timeline.value.duration())
      }
    }
  }

  /**
   * 进度条拖拽 Seek (0.0 ~ 1.0)
   * @param value 进度百分比
   */
  function seekProgress(value: number): void {
    if (!timeline.value) return
    const clamped = Math.max(0, Math.min(1, value))
    timeline.value.progress(clamped)
    progress.value = clamped
    if (clamped >= 1) {
      playbackState.value = 'completed'
    } else if (playbackState.value === 'completed') {
      playbackState.value = 'paused'
    }
  }

  /**
   * 变更播放速率
   * @param speed 倍速率 (0.5 | 1 | 1.5 | 2)
   */
  function setSpeed(speed: PlaybackSpeed): void {
    playbackSpeed.value = speed
    if (timeline.value) {
      timeline.value.timeScale(speed)
    }
  }

  // 组件卸载时清理时间轴实例
  if (getCurrentInstance()) {
    onUnmounted(() => {
      if (timeline.value) {
        timeline.value.kill()
        timeline.value = null
      }
    })
  }

  return {
    timeline,
    playbackState,
    isPlaying,
    progress,
    playbackSpeed,
    currentStepIndex,
    currentStep,
    stepsList,
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
  }
}
