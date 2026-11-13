import { describe, it, expect, beforeEach } from 'vitest'
import gsap from 'gsap'
import { useGsapTimeline } from '@/composables/useGsapTimeline'
import type { AnimationStep } from '@/types/animation'

describe('useGsapTimeline Controller Composable', () => {
  const dummySteps: AnimationStep[] = [
    {
      id: 's1',
      stepNumber: 1,
      titleKey: 's1.title',
      descriptionKey: 's1.desc',
      duration: 2,
      camera: { x: 0, y: 0, scale: 1 },
    },
    {
      id: 's2',
      stepNumber: 2,
      titleKey: 's2.title',
      descriptionKey: 's2.desc',
      duration: 3,
      camera: { x: 10, y: 10, scale: 1.2 },
    },
    {
      id: 's3',
      stepNumber: 3,
      titleKey: 's3.title',
      descriptionKey: 's3.desc',
      duration: 2.5,
      camera: { x: -10, y: 0, scale: 1.5 },
    },
  ]

  let tl: gsap.core.Timeline

  beforeEach(() => {
    tl = gsap.timeline()
    tl.to({}, { duration: 7.5 }) // 2 + 3 + 2.5 = 7.5
  })

  it('should initialize timeline and step offsets properly', () => {
    const { initTimeline, playbackState, currentStepIndex, progress, totalDuration } = useGsapTimeline()
    initTimeline(tl, dummySteps)

    expect(playbackState.value).toBe('idle')
    expect(currentStepIndex.value).toBe(0)
    expect(progress.value).toBe(0)
    expect(totalDuration.value).toBe(7.5)
  })

  it('should handle play, pause and togglePlay states', () => {
    const { initTimeline, play, pause, togglePlay, isPlaying, playbackState } = useGsapTimeline()
    initTimeline(tl, dummySteps)

    expect(isPlaying.value).toBe(false)

    play()
    expect(isPlaying.value).toBe(true)
    expect(playbackState.value).toBe('playing')

    pause()
    expect(isPlaying.value).toBe(false)
    expect(playbackState.value).toBe('paused')

    togglePlay()
    expect(isPlaying.value).toBe(true)

    togglePlay()
    expect(isPlaying.value).toBe(false)
  })

  it('should seek to specific step by index and step through next/prev', () => {
    const { initTimeline, seekToStep, nextStep, prevStep, currentStepIndex } = useGsapTimeline()
    initTimeline(tl, dummySteps)

    seekToStep(1)
    expect(currentStepIndex.value).toBe(1)

    nextStep()
    expect(currentStepIndex.value).toBe(2)

    // Cannot advance past last step
    nextStep()
    expect(currentStepIndex.value).toBe(2)

    prevStep()
    expect(currentStepIndex.value).toBe(1)

    prevStep()
    expect(currentStepIndex.value).toBe(0)

    // Cannot go before first step
    prevStep()
    expect(currentStepIndex.value).toBe(0)
  })

  it('should adjust playback speed via setSpeed', () => {
    const { initTimeline, setSpeed, playbackSpeed } = useGsapTimeline()
    initTimeline(tl, dummySteps)

    setSpeed(1.5)
    expect(playbackSpeed.value).toBe(1.5)
    expect(tl.timeScale()).toBe(1.5)

    setSpeed(2)
    expect(playbackSpeed.value).toBe(2)
    expect(tl.timeScale()).toBe(2)
  })

  it('should reset playback back to origin', () => {
    const { initTimeline, play, reset, progress, playbackState, currentStepIndex } = useGsapTimeline()
    initTimeline(tl, dummySteps)

    play()
    reset()

    expect(playbackState.value).toBe('idle')
    expect(progress.value).toBe(0)
    expect(currentStepIndex.value).toBe(0)
  })
})
