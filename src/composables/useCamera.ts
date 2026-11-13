import { ref, computed } from 'vue'
import gsap from 'gsap'
import type { CameraPose } from '@/types/animation'

/**
 * 默认摄影机初始姿态
 */
export const DEFAULT_CAMERA_POSE: CameraPose = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
}

/**
 * 虚拟电影镜头控制器 Composable (useCamera)
 * 模拟专业摄影机的平移 (Pan)、变焦 (Zoom)、对焦 (Focus) 与视角旋转
 */
export function useCamera() {
  // 摄影机当前姿态（响应式对象）
  const cameraState = ref<CameraPose>({ ...DEFAULT_CAMERA_POSE })

  // 内部 GSAP 动画补间句柄
  let cameraTween: gsap.core.Tween | null = null

  /**
   * 计算摄影机在舞台画布上的 CSS Transform 样式
   */
  const cameraStyle = computed(() => {
    const { x, y, scale, rotation = 0 } = cameraState.value
    return {
      transform: `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotation}deg)`,
      transformOrigin: '50% 50%',
      transition: cameraTween ? 'none' : 'transform 0.05s ease-out',
      willChange: 'transform',
    }
  })

  /**
   * 平滑将镜头推移至指定目标姿态 (Cinematic Transition)
   * @param targetPose 目标姿态参数 (x, y, scale, rotation)
   * @param duration 运镜时间 (秒)，默认 1.2 秒
   * @param ease GSAP 缓动曲线，默认 'power3.inOut' 电影级自然平滑阻尼
   */
  function animateTo(
    targetPose: Partial<CameraPose>,
    duration = 1.2,
    ease = 'power3.inOut'
  ): Promise<void> {
    if (cameraTween) {
      cameraTween.kill()
    }

    return new Promise((resolve) => {
      cameraTween = gsap.to(cameraState.value, {
        x: targetPose.x ?? cameraState.value.x,
        y: targetPose.y ?? cameraState.value.y,
        scale: targetPose.scale ?? cameraState.value.scale,
        rotation: targetPose.rotation ?? cameraState.value.rotation ?? 0,
        duration,
        ease,
        onComplete: () => {
          cameraTween = null
          resolve()
        },
      })
    })
  }

  /**
   * 立即设置镜头姿态（无补间过渡）
   */
  function setPose(pose: Partial<CameraPose>): void {
    if (cameraTween) {
      cameraTween.kill()
      cameraTween = null
    }
    cameraState.value = {
      ...cameraState.value,
      ...pose,
    }
  }

  /**
   * 镜头重置至原始全景
   */
  function resetCamera(duration = 0.8): void {
    animateTo(DEFAULT_CAMERA_POSE, duration, 'power2.out')
  }

  /**
   * 镜头变焦操作 (Zoom In / Zoom Out)
   * @param factor 缩放倍率增量
   */
  function zoomBy(factor: number): void {
    const currentScale = cameraState.value.scale
    const nextScale = Math.min(Math.max(currentScale * factor, 0.4), 3.5)
    animateTo({ scale: nextScale }, 0.3, 'power1.out')
  }

  /**
   * 手动拖拽平移镜头 (Pan)
   * @param deltaX X 轴位移
   * @param deltaY Y 轴位移
   */
  function panBy(deltaX: number, deltaY: number): void {
    cameraState.value.x += deltaX
    cameraState.value.y += deltaY
  }

  return {
    cameraState,
    cameraStyle,
    animateTo,
    setPose,
    resetCamera,
    zoomBy,
    panBy,
  }
}
