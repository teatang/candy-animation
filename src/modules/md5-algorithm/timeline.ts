import gsap from 'gsap'
import type { useCamera } from '@/composables/useCamera'

/**
 * 创建 MD5 算法底层运算全流程动画时间轴
 * @param stageEl 舞台根 DOM 元素
 * @param camera 虚拟摄影机控制器
 * @param options 回调配置
 */
export function createMd5Timeline(
  stageEl: HTMLElement,
  camera: ReturnType<typeof useCamera>,
  options: { onStepChange?: (step: number) => void }
): gsap.core.Timeline {
  const q = gsap.utils.selector(stageEl)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  const paddingSection = q('.md5-padding-section')
  const bitOriginal = q('.bit-original')
  const bitOne = q('.bit-one')
  const bitZeros = q('.bit-zeros')
  const bitLength = q('.bit-length')
  const total512Badge = q('.total-512-badge')

  const registersSection = q('.md5-registers-section')
  const regCards = q('.reg-card')
  const regValA = q('.reg-val-a')
  const regValB = q('.reg-val-b')
  const regValC = q('.reg-val-c')
  const regValD = q('.reg-val-d')

  const roundSection = q('.md5-round-section')
  const roundCounter = q('.round-step-counter')
  const activeFuncBadge = q('.active-func-badge')
  const cascadeSection = q('.md5-cascade-section')
  const finalDigestBox = q('.final-digest-box')

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
     阶段 1: 消息填充（Padding）与长度追加 (0s ~ 5.5s)
     ========================================================== */
  tl.addLabel('step1', 0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: -20, scale: 1.15 }, 1.0)
    options.onStepChange?.(0)
  }, undefined, 'step1')

  tl.to(paddingSection, { opacity: 1, duration: 0.4 }, 'step1+=0.2')
  tl.fromTo(bitOriginal, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, 'step1+=0.3')

  // 补 1 位
  tl.fromTo(
    bitOne,
    { scale: 0, opacity: 0, y: -15 },
    { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: 'back.out(2)' },
    'step1+=1.2'
  )

  // 补若干 0 直至 448 位
  tl.fromTo(
    bitZeros,
    { scale: 0.5, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
    'step1+=2.2'
  )

  // 追加 64 位原始长度
  tl.fromTo(
    bitLength,
    { scale: 0.6, opacity: 0, x: 20 },
    { scale: 1, opacity: 1, x: 0, duration: 0.9, ease: 'back.out(1.5)' },
    'step1+=3.6'
  )

  // 形成 512 位完整分组徽章
  tl.to(total512Badge, { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' }, 'step1+=4.6')

  /* ==========================================================
     阶段 2: 初始化 4 个 32-bit 幻数缓冲区 (5.5s ~ 10.5s)
     ========================================================== */
  tl.addLabel('step2', 5.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 10, scale: 1.3 }, 1.2)
    options.onStepChange?.(1)
  }, undefined, 'step2')

  // 淡出填充区，展示 4 个寄存器
  tl.to(paddingSection, { opacity: 0.25, duration: 0.5 }, 'step2+=0.2')
  tl.to(registersSection, { opacity: 1, duration: 0.6 }, 'step2+=0.3')
  tl.fromTo(
    regCards,
    { y: 30, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: 'back.out(1.8)' },
    'step2+=0.5'
  )

  // 呼吸高亮
  tl.to(regCards, {
    boxShadow: '0 0 25px rgba(139, 92, 246, 0.5)',
    duration: 1.2,
    yoyo: true,
    repeat: 1,
  }, 'step2+=2.0')

  /* ==========================================================
     阶段 3: 512 位分组与 4 轮 (共 64 步) 主循环运算 (10.5s ~ 17.5s)
     ========================================================== */
  tl.addLabel('step3', 10.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 20, scale: 1.25 }, 1.2)
    options.onStepChange?.(2)
  }, undefined, 'step3')

  tl.to(registersSection, { opacity: 0.35, duration: 0.4 }, 'step3+=0.1')
  tl.to(roundSection, { opacity: 1, duration: 0.6 }, 'step3+=0.2')

  // 轮次 1: F 函数 (步 1 ~ 16)
  tl.to(activeFuncBadge, { textContent: 'Round 1: F(B,C,D) = (B ∧ C) ∨ (¬B ∧ D)', duration: 0.2 }, 'step3+=0.5')
  tl.to(roundCounter, { textContent: 'Step: 08 / 64', duration: 1.0 }, 'step3+=0.6')

  // 模拟寄存器数值雪崩快速变幻
  tl.to(regValA, { textContent: '0xd76aa478', duration: 0.1 }, 'step3+=0.8')
  tl.to(regValB, { textContent: '0xe8c7b756', duration: 0.1 }, 'step3+=1.1')

  // 轮次 2: G 函数 (步 17 ~ 32)
  tl.to(activeFuncBadge, { textContent: 'Round 2: G(B,C,D) = (B ∧ D) ∨ (C ∧ ¬D)', duration: 0.2 }, 'step3+=2.0')
  tl.to(roundCounter, { textContent: 'Step: 24 / 64', duration: 1.0 }, 'step3+=2.1')
  tl.to(regValC, { textContent: '0x242070db', duration: 0.1 }, 'step3+=2.3')
  tl.to(regValD, { textContent: '0xc1bdceee', duration: 0.1 }, 'step3+=2.6')

  // 轮次 3: H 函数 (步 33 ~ 48)
  tl.to(activeFuncBadge, { textContent: 'Round 3: H(B,C,D) = B ⊕ C ⊕ D', duration: 0.2 }, 'step3+=3.5')
  tl.to(roundCounter, { textContent: 'Step: 40 / 64', duration: 1.0 }, 'step3+=3.6')
  tl.to(regValA, { textContent: '0xf4d50d87', duration: 0.1 }, 'step3+=3.8')

  // 轮次 4: I 函数 (步 49 ~ 64)
  tl.to(activeFuncBadge, { textContent: 'Round 4: I(B,C,D) = C ⊕ (B ∨ ¬D)', duration: 0.2 }, 'step3+=5.0')
  tl.to(roundCounter, { textContent: 'Step: 64 / 64 (Complete)', duration: 1.0 }, 'step3+=5.1')
  tl.to(regValB, { textContent: '0x455a14ed', duration: 0.1 }, 'step3+=5.3')

  /* ==========================================================
     阶段 4: 级联拼接输出 128 位十六进制摘要 (17.5s ~ 23.0s)
     ========================================================== */
  tl.addLabel('step4', 17.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.0 }, 1.4)
    options.onStepChange?.(3)
  }, undefined, 'step4')

  tl.to([roundSection, paddingSection], { opacity: 0.15, duration: 0.5 }, 'step4+=0.1')
  tl.to(registersSection, { opacity: 1, duration: 0.6 }, 'step4+=0.2')
  tl.to(cascadeSection, { opacity: 1, duration: 0.6 }, 'step4+=0.5')

  // 寄存器最终值复位为计算好的标准值
  tl.to(regValA, { textContent: '0x2a98f10b', duration: 0.2 }, 'step4+=0.8')
  tl.to(regValB, { textContent: '0x4b78c91d', duration: 0.2 }, 'step4+=0.8')
  tl.to(regValC, { textContent: '0x6e5428af', duration: 0.2 }, 'step4+=0.8')
  tl.to(regValD, { textContent: '0x99dc103b', duration: 0.2 }, 'step4+=0.8')

  // 级联弹出最终 128-bit 32位十六进制散列卡片
  tl.fromTo(
    finalDigestBox,
    { scale: 0.7, opacity: 0, y: 30 },
    { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: 'elastic.out(1, 0.6)' },
    'step4+=1.5'
  )

  return tl
}
