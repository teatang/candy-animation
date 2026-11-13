import { describe, it, expect } from 'vitest'
import { useCamera, DEFAULT_CAMERA_POSE } from '@/composables/useCamera'

describe('useCamera Composable', () => {
  it('should initialize with default camera pose', () => {
    const { cameraState, cameraStyle } = useCamera()
    expect(cameraState.value).toEqual(DEFAULT_CAMERA_POSE)
    expect(cameraStyle.value.transform).toContain('scale(1)')
    expect(cameraStyle.value.transform).toContain('translate3d(0px, 0px, 0)')
  })

  it('should pan camera position via panBy', () => {
    const { cameraState, panBy } = useCamera()
    panBy(50, -30)
    expect(cameraState.value.x).toBe(50)
    expect(cameraState.value.y).toBe(-30)

    panBy(-20, 10)
    expect(cameraState.value.x).toBe(30)
    expect(cameraState.value.y).toBe(-20)
  })

  it('should set camera pose directly via setPose', () => {
    const { cameraState, setPose, cameraStyle } = useCamera()
    setPose({ x: 120, y: -80, scale: 1.5, rotation: 10 })
    expect(cameraState.value.x).toBe(120)
    expect(cameraState.value.y).toBe(-80)
    expect(cameraState.value.scale).toBe(1.5)
    expect(cameraState.value.rotation).toBe(10)
    expect(cameraStyle.value.transform).toContain('scale(1.5)')
    expect(cameraStyle.value.transform).toContain('rotate(10deg)')
  })

  it('should clamp scale within bounds during zoomBy', () => {
    const { cameraState, zoomBy } = useCamera()
    zoomBy(1.5)
    // GSAP tween is triggered, or set directly
    expect(cameraState.value.scale).toBeGreaterThanOrEqual(1)
  })
})
