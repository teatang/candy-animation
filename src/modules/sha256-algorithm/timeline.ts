import gsap from 'gsap'
import type { useCamera } from '@/composables/useCamera'

/**
 * 创建 SHA-256 算法底层运算全流程动画时间轴
 * @param stageEl 舞台根 DOM 元素
 * @param camera 虚拟摄影机控制器
 * @param options 回调配置
 */
export function createSha256Timeline(
  stageEl: HTMLElement,
  camera: ReturnType<typeof useCamera>,
  options: { onStepChange?: (step: number) => void }
): gsap.core.Timeline {
  const q = gsap.utils.selector(stageEl)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  const paddingSection = q('.sha-padding-section')
  const bitOriginal = q('.sha-bit-original')
  const bitOne = q('.sha-bit-one')
  const bitZeros = q('.sha-bit-zeros')
  const bitLength = q('.sha-bit-length')
  const total512Badge = q('.sha-total-512-badge')

  const registersSection = q('.sha-registers-section')
  const regCards = q('.sha-reg-card')
  const roundSection = q('.sha-round-section')
  const roundCounter = q('.sha-round-step-counter')
  const activeFuncBadge = q('.sha-active-func-badge')
  const cascadeSection = q('.sha-cascade-section')
  const finalDigestBox = q('.sha-final-digest-box')

  // 初始隐藏状态
  gsap.set(
    [
      bitOne,
      bitZeros,
      bitLength,
      total512Badge,
      registersSection,
      roundSection,
      cascadeSection,
      finalDigestBox,
    ],
    { opacity: 0 }
  )

  /* ==========================================================
     阶段 1: 消息填充（Padding）与 64 位大端长度追加 (0s ~ 5.5s)
     ========================================================== */
  tl.addLabel('step1', 0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: -25, scale: 1.15 }, 1.0)
    options.onStepChange?.(0)
  }, undefined, 'step1')

  tl.to(paddingSection, { opacity: 1, duration: 0.4 }, 'step1+=0.2')
  tl.fromTo(bitOriginal, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 'step1+=0.3')

  // 追加 1 位 (0x80)
  tl.fromTo(
    bitOne,
    { scale: 0, opacity: 0, y: -15 },
    { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(2)' },
    'step1+=1.2'
  )

  // 补零至 448 位
  tl.fromTo(
    bitZeros,
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
    'step1+=2.2'
  )

  // 追加 64 位大端序长度
  tl.fromTo(
    bitLength,
    { scale: 0.6, opacity: 0, x: 20 },
    { scale: 1, opacity: 1, x: 0, duration: 0.9, ease: 'back.out(1.5)' },
    'step1+=3.6'
  )

  tl.to(total512Badge, { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' }, 'step1+=4.6')

  /* ==========================================================
     阶段 2: 初始化 8 个 32-bit 哈希寄存器 (5.5s ~ 10.5s)
     ========================================================== */
  tl.addLabel('step2', 5.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 10, scale: 1.3 }, 1.2)
    options.onStepChange?.(1)
  }, undefined, 'step2')

  tl.to(paddingSection, { opacity: 0.2, duration: 0.5 }, 'step2+=0.2')
  tl.to(registersSection, { opacity: 1, duration: 0.6 }, 'step2+=0.3')
  tl.fromTo(
    regCards,
    { y: 25, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.8, ease: 'back.out(1.8)' },
    'step2+=0.5'
  )

  // 呼吸发光
  tl.to(regCards, {
    boxShadow: '0 0 20px rgba(245, 158, 11, 0.45)',
    duration: 1.2,
    yoyo: true,
    repeat: 1,
  }, 'step2+=2.0')

  /* ==========================================================
     阶段 3: 消息调度 W[0..63] 与 64 轮主压缩循环 (10.5s ~ 17.5s)
     ========================================================== */
  tl.addLabel('step3', 10.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 20, scale: 1.25 }, 1.2)
    options.onStepChange?.(2)
  }, undefined, 'step3')

  tl.to(registersSection, { opacity: 0.35, duration: 0.4 }, 'step3+=0.1')
  tl.to(roundSection, { opacity: 1, duration: 0.6 }, 'step3+=0.2')

  // 轮次 1 ~ 16 扩展
  tl.to(activeFuncBadge, { textContent: 'Schedule: W[t] = σ1(W[t-2]) + W[t-7] + σ0(W[t-15]) + W[t-16]', duration: 0.2 }, 'step3+=0.5')
  tl.to(roundCounter, { textContent: 'Round: 16 / 64', duration: 1.0 }, 'step3+=0.6')

  // 轮次 17 ~ 32 压缩
  tl.to(activeFuncBadge, { textContent: 'Round 32: T1 = h + Σ1(e) + Ch(e,f,g) + K[t] + W[t]', duration: 0.2 }, 'step3+=2.0')
  tl.to(roundCounter, { textContent: 'Round: 32 / 64', duration: 1.0 }, 'step3+=2.1')

  // 轮次 33 ~ 48 压缩
  tl.to(activeFuncBadge, { textContent: 'Round 48: T2 = Σ0(a) + Maj(a,b,c)', duration: 0.2 }, 'step3+=3.5')
  tl.to(roundCounter, { textContent: 'Round: 48 / 64', duration: 1.0 }, 'step3+=3.6')

  // 轮次 49 ~ 64 最终完成
  tl.to(activeFuncBadge, { textContent: 'Round 64: a = T1 + T2, e = d + T1 (Final Round)', duration: 0.2 }, 'step3+=5.0')
  tl.to(roundCounter, { textContent: 'Round: 64 / 64 (Complete)', duration: 1.0 }, 'step3+=5.1')

  /* ==========================================================
     阶段 4: 级联输出 256 位十六进制摘要 (17.5s ~ 23.0s)
     ========================================================== */
  tl.addLabel('step4', 17.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.0 }, 1.4)
    options.onStepChange?.(3)
  }, undefined, 'step4')

  tl.to([roundSection, paddingSection], { opacity: 0.15, duration: 0.5 }, 'step4+=0.1')
  tl.to(registersSection, { opacity: 1, duration: 0.6 }, 'step4+=0.2')
  tl.to(cascadeSection, { opacity: 1, duration: 0.6 }, 'step4+=0.5')

  // 弹出最终 256-bit 64位十六进制散列卡片
  tl.fromTo(
    finalDigestBox,
    { scale: 0.7, opacity: 0, y: 30 },
    { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'elastic.out(1, 0.6)' },
    'step4+=1.5'
  )

  // 严格确保总时长精确对齐 23.0 秒
  tl.set({}, {}, 23.0)

  return tl
}
