<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[500px] flex items-center justify-center overflow-hidden stage-grid-bg bg-stage-light dark:bg-stage-dark cursor-grab active:cursor-grabbing select-none"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
    @mouseleave="handleMouseUp"
    @wheel.prevent="handleWheel"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
  >
    <!-- 虚拟电影摄影机运动容器 (CSS Transform 驱动) -->
    <div
      class="camera-viewport relative flex items-center justify-center pointer-events-auto"
      :style="camera.cameraStyle.value"
    >
      <slot></slot>
    </div>

    <!-- 摄影机 HUD 镜头控制悬浮面板 -->
    <div
      class="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg"
    >
      <!-- 缩放比例指示 -->
      <span class="font-mono text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold min-w-[50px] text-center">
        {{ Math.round(camera.cameraState.value.scale * 100) }}%
      </span>

      <!-- 放大 -->
      <button
        class="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center text-sm transition-colors"
        title="Zoom In"
        @click="camera.zoomBy(1.2)"
      >
        ➕
      </button>

      <!-- 缩小 -->
      <button
        class="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center text-sm transition-colors"
        title="Zoom Out"
        @click="camera.zoomBy(0.8)"
      >
        ➖
      </button>

      <!-- 复位镜头视角 -->
      <button
        class="px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1 transition-colors"
        :title="t('playback.cameraReset')"
        @click="camera.resetCamera()"
      >
        <span>🎯</span>
        <span class="hidden sm:inline">{{ t('playback.cameraReset') }}</span>
      </button>
    </div>

    <!-- 底部操作微提示 (桌面/移动均可见) -->
    <div
      class="absolute bottom-2 left-4 z-20 pointer-events-none text-[11px] text-slate-400 dark:text-slate-500 font-mono hidden sm:flex items-center gap-1.5"
    >
      <span class="w-1.5 h-1.5 rounded-full bg-candy-cyan animate-pulse"></span>
      <span>{{ t('playback.cameraHint') }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { useCamera } from '@/composables/useCamera'

const props = defineProps<{
  camera: ReturnType<typeof useCamera>
}>()

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)

// 鼠标拖拽平移状态
let isDragging = false
let startX = 0
let startY = 0

function handleMouseDown(e: MouseEvent): void {
  // 仅在主键拖拽且非按钮点击时生效
  if (e.button !== 0) return
  if ((e.target as HTMLElement).closest('button, input, select, .el-switch')) return
  isDragging = true
  startX = e.clientX
  startY = e.clientY
}

function handleMouseMove(e: MouseEvent): void {
  if (!isDragging) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY
  startX = e.clientX
  startY = e.clientY
  props.camera.panBy(dx, dy)
}

function handleMouseUp(): void {
  isDragging = false
}

function handleWheel(e: WheelEvent): void {
  const delta = e.deltaY < 0 ? 1.08 : 0.92
  props.camera.zoomBy(delta)
}

// 触控手势处理 (移动端多点触控与单点平移)
let touchStartX = 0
let touchStartY = 0
let initialPinchDistance = 0

function handleTouchStart(e: TouchEvent): void {
  if (e.touches.length === 1) {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  } else if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    initialPinchDistance = Math.hypot(dx, dy)
  }
}

function handleTouchMove(e: TouchEvent): void {
  if (e.touches.length === 1) {
    const dx = e.touches[0].clientX - touchStartX
    const dy = e.touches[0].clientY - touchStartY
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
    props.camera.panBy(dx, dy)
  } else if (e.touches.length === 2) {
    const dx = e.touches[0].clientX - e.touches[1].clientX
    const dy = e.touches[0].clientY - e.touches[1].clientY
    const currentDistance = Math.hypot(dx, dy)
    if (initialPinchDistance > 0) {
      const scaleDelta = currentDistance / initialPinchDistance
      if (Math.abs(scaleDelta - 1) > 0.02) {
        props.camera.zoomBy(scaleDelta > 1 ? 1.05 : 0.95)
        initialPinchDistance = currentDistance
      }
    }
  }
}

function handleTouchEnd(): void {
  initialPinchDistance = 0
}
</script>
