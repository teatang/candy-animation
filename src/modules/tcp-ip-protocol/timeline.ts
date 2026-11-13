import gsap from 'gsap'
import type { useCamera } from '@/composables/useCamera'

/**
 * 创建 TCP/IP 协议栈分层与数据包封装原理动画时间轴
 * @param stageEl 舞台根 DOM 元素
 * @param camera 虚拟镜头控制器
 * @param options 回调配置
 */
export function createTcpIpTimeline(
  stageEl: HTMLElement,
  camera: ReturnType<typeof useCamera>,
  options: { onStepChange?: (step: number) => void }
): gsap.core.Timeline {
  const q = gsap.utils.selector(stageEl)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  const hostAStack = q('.host-a-stack')
  const hostBStack = q('.host-b-stack')
  const packetPayload = q('.packet-app-payload')
  const headerTcp = q('.header-tcp-block')
  const headerIp = q('.header-ip-block')
  const headerEth = q('.header-eth-block')
  const trailerFcs = q('.trailer-fcs-block')
  const physicalWire = q('.tcpip-physical-wire')
  const travelingFrame = q('.tcpip-traveling-frame')
  const decapsulationBox = q('.tcpip-decapsulation-box')
  const deliverySuccessBadge = q('.delivery-success-badge')

  // 初始隐藏各封装层与飞行帧
  gsap.set(
    [
      headerTcp,
      headerIp,
      headerEth,
      trailerFcs,
      travelingFrame,
      decapsulationBox,
      deliverySuccessBadge,
    ],
    { opacity: 0, scale: 0.8 }
  )

  gsap.set(physicalWire, { strokeDasharray: 400, strokeDashoffset: 400 })

  /* ==========================================================
     阶段 1: 应用层数据生成与传输层 (TCP) 段封装 (0s ~ 5.5s)
     ========================================================== */
  tl.addLabel('step1', 0)
  tl.call(() => {
    camera.animateTo({ x: -140, y: -20, scale: 1.25 }, 1.0)
    options.onStepChange?.(0)
  }, undefined, 'step1')

  // 应用层载荷淡入高亮
  tl.fromTo(
    packetPayload,
    { scale: 0.8, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.5)' },
    'step1+=0.3'
  )

  // TCP 报头下落并拼接在载荷前端
  tl.fromTo(
    headerTcp,
    { y: -30, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' },
    'step1+=1.8'
  )

  // 形成 TCP 段高亮
  tl.to(q('.tcp-segment-glow'), {
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
    duration: 1.0,
    yoyo: true,
    repeat: 1,
  }, 'step1+=3.2')

  /* ==========================================================
     阶段 2: 网络层 (IP) 数据报封装与逻辑寻址 (5.5s ~ 11.0s)
     ========================================================== */
  tl.addLabel('step2', 5.5)
  tl.call(() => {
    camera.animateTo({ x: -100, y: 10, scale: 1.25 }, 1.2)
    options.onStepChange?.(1)
  }, undefined, 'step2')

  // IP 报头滑入并包裹在 TCP 段外部
  tl.fromTo(
    headerIp,
    { x: -40, opacity: 0, scale: 0.8 },
    { x: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'back.out(1.4)' },
    'step2+=0.4'
  )

  // IP 寻址发光
  tl.to(q('.ip-packet-glow'), {
    borderColor: '#3b82f6',
    boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)',
    duration: 1.0,
  }, 'step2+=2.2')

  /* ==========================================================
     阶段 3: 数据链路层 (Ethernet) 帧封装与物理链路传输 (11.0s ~ 17.0s)
     ========================================================== */
  tl.addLabel('step3', 11.0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.05 }, 1.2)
    options.onStepChange?.(2)
  }, undefined, 'step3')

  // 以太网 MAC 头与 FCS 尾部同时闭合封装
  tl.fromTo(
    headerEth,
    { x: -30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
    'step3+=0.2'
  )
  tl.fromTo(
    trailerFcs,
    { x: 30, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
    'step3+=0.2'
  )

  // 物理光纤导轨点亮
  tl.to(physicalWire, { strokeDashoffset: 0, duration: 0.8 }, 'step3+=1.2')

  // 完整以太网帧在物理信道中飞速穿梭
  tl.fromTo(
    travelingFrame,
    { opacity: 0, x: -240, scale: 0.7 },
    { opacity: 1, x: 240, scale: 1, duration: 2.2, ease: 'power1.inOut' },
    'step3+=2.0'
  )
  tl.to(travelingFrame, { opacity: 0, duration: 0.3 }, 'step3+=4.2')

  /* ==========================================================
     阶段 4: 目的主机逐层解封装与上层交付 (17.0s ~ 23.0s)
     ========================================================== */
  tl.addLabel('step4', 17.0)
  tl.call(() => {
    camera.animateTo({ x: 140, y: 0, scale: 1.2 }, 1.2)
    options.onStepChange?.(3)
  }, undefined, 'step4')

  tl.to(decapsulationBox, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 'step4+=0.2')

  // 逐层剥除报头动画 (剥去以太网 -> 剥去 IP -> 剥去 TCP)
  tl.to(q('.peel-eth'), { opacity: 0.2, x: -20, duration: 0.8 }, 'step4+=0.8')
  tl.to(q('.peel-ip'), { opacity: 0.2, x: -15, duration: 0.8 }, 'step4+=1.8')
  tl.to(q('.peel-tcp'), { opacity: 0.2, x: -10, duration: 0.8 }, 'step4+=2.8')

  // 最终纯净数据交付至 Web 服务成功
  tl.to(deliverySuccessBadge, { opacity: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.6)' }, 'step4+=3.8')

  // 严格确保总时长精确对齐 23.0 秒
  tl.set({}, {}, 23.0)

  return tl
}
