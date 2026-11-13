import gsap from 'gsap'
import type { useCamera } from '@/composables/useCamera'

/**
 * 创建 TCP 协议三次握手与四次挥手原理动画时间轴
 * @param stageEl 舞台根 DOM 元素
 * @param camera 虚拟镜头控制器
 * @param options 回调配置
 */
export function createTcpHandshakeWaveTimeline(
  stageEl: HTMLElement,
  camera: ReturnType<typeof useCamera>,
  options: { onStepChange?: (step: number) => void }
): gsap.core.Timeline {
  const q = gsap.utils.selector(stageEl)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  const clientBox = q('.tcp-client-box')
  const serverBox = q('.tcp-server-box')
  const clientState = q('.client-state-text')
  const serverState = q('.server-state-text')

  const pktSyn = q('.pkt-syn')
  const pktSynAck = q('.pkt-syn-ack')
  const pktAck3Way = q('.pkt-ack-3way')
  const establishedBanner = q('.tcp-established-banner')

  const pktFin1 = q('.pkt-fin-1')
  const pktAckFin1 = q('.pkt-ack-fin1')
  const pktFin2 = q('.pkt-fin-2')
  const pktAckFin2 = q('.pkt-ack-fin2')

  const timeWaitBox = q('.tcp-time-wait-box')
  const mslCountdownVal = q('.msl-countdown-val')

  // 初始隐藏飞行报文与状态提示卡片
  gsap.set(
    [
      pktSyn,
      pktSynAck,
      pktAck3Way,
      establishedBanner,
      pktFin1,
      pktAckFin1,
      pktFin2,
      pktAckFin2,
      timeWaitBox,
    ],
    { opacity: 0, scale: 0.85 }
  )

  /* ==========================================================
     阶段 1: 连接建立 - 客户端 SYN 与服务端 SYN+ACK (0s ~ 5.5s)
     ========================================================== */
  tl.addLabel('step1', 0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: -25, scale: 1.15 }, 1.0)
    options.onStepChange?.(0)
  }, undefined, 'step1')

  // 初始客户端与服务端状态
  tl.to(clientState, { textContent: 'CLOSED', duration: 0.1 }, 'step1+=0.1')
  tl.to(serverState, { textContent: 'LISTEN', duration: 0.1 }, 'step1+=0.1')

  // 客户端发起连接，转为 SYN_SENT
  tl.to(clientState, { textContent: 'SYN_SENT', duration: 0.3 }, 'step1+=0.6')
  tl.to(clientBox, { boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)', duration: 0.4 }, 'step1+=0.6')

  // 握手 1: 客户端 -> 服务端 SYN=1, seq=x
  tl.fromTo(
    pktSyn,
    { opacity: 0, x: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step1+=1.0'
  )
  tl.to(
    pktSyn,
    { x: 380, duration: 1.5, ease: 'power1.inOut' },
    'step1+=1.4'
  )
  tl.to(pktSyn, { opacity: 0, duration: 0.3 }, 'step1+=2.9')

  // 服务端收到 SYN，转为 SYN_RCVD
  tl.to(serverState, { textContent: 'SYN_RCVD', duration: 0.3 }, 'step1+=3.0')
  tl.to(serverBox, { boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)', duration: 0.4 }, 'step1+=3.0')

  // 握手 2: 服务端 -> 客户端 SYN=1, ACK=1, seq=y, ack=x+1
  tl.fromTo(
    pktSynAck,
    { opacity: 0, x: 380, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step1+=3.4'
  )
  tl.to(
    pktSynAck,
    { x: 0, duration: 1.5, ease: 'power1.inOut' },
    'step1+=3.8'
  )
  tl.to(pktSynAck, { opacity: 0, duration: 0.3 }, 'step1+=5.3')

  /* ==========================================================
     阶段 2: 握手确立 - 客户端 ACK 与连接双向 ESTABLISHED (5.5s ~ 11.5s)
     ========================================================== */
  tl.addLabel('step2', 5.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: -10, scale: 1.2 }, 1.0)
    options.onStepChange?.(1)
  }, undefined, 'step2')

  // 客户端收到 SYN+ACK，转为 ESTABLISHED
  tl.to(clientState, { textContent: 'ESTABLISHED', duration: 0.3 }, 'step2+=0.2')

  // 握手 3: 客户端 -> 服务端 ACK=1, seq=x+1, ack=y+1
  tl.fromTo(
    pktAck3Way,
    { opacity: 0, x: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step2+=0.6'
  )
  tl.to(
    pktAck3Way,
    { x: 380, duration: 1.5, ease: 'power1.inOut' },
    'step2+=1.0'
  )
  tl.to(pktAck3Way, { opacity: 0, duration: 0.3 }, 'step2+=2.5')

  // 服务端收到 ACK，转为 ESTABLISHED
  tl.to(serverState, { textContent: 'ESTABLISHED', duration: 0.3 }, 'step2+=2.6')

  // 双向通道建立横幅高亮
  tl.fromTo(
    establishedBanner,
    { opacity: 0, scale: 0.7, y: 15 },
    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.6)' },
    'step2+=3.0'
  )

  /* ==========================================================
     阶段 3: 连接释放 - 客户端主动 FIN 与半关闭 (CLOSE_WAIT) (11.5s ~ 17.5s)
     ========================================================== */
  tl.addLabel('step3', 11.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 15, scale: 1.2 }, 1.0)
    options.onStepChange?.(2)
  }, undefined, 'step3')

  // 隐藏建立状态横幅
  tl.to(establishedBanner, { opacity: 0, scale: 0.85, duration: 0.4 }, 'step3+=0.1')

  // 客户端准备断开连接，状态变为 FIN_WAIT_1
  tl.to(clientState, { textContent: 'FIN_WAIT_1', duration: 0.3 }, 'step3+=0.5')

  // 挥手 1: 客户端 -> 服务端 FIN=1, seq=u
  tl.fromTo(
    pktFin1,
    { opacity: 0, x: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step3+=0.9'
  )
  tl.to(
    pktFin1,
    { x: 380, duration: 1.5, ease: 'power1.inOut' },
    'step3+=1.3'
  )
  tl.to(pktFin1, { opacity: 0, duration: 0.3 }, 'step3+=2.8')

  // 服务端收到 FIN，转为 CLOSE_WAIT
  tl.to(serverState, { textContent: 'CLOSE_WAIT', duration: 0.3 }, 'step3+=2.9')

  // 挥手 2: 服务端 -> 客户端 ACK=1, seq=v, ack=u+1
  tl.fromTo(
    pktAckFin1,
    { opacity: 0, x: 380, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step3+=3.3'
  )
  tl.to(
    pktAckFin1,
    { x: 0, duration: 1.5, ease: 'power1.inOut' },
    'step3+=3.7'
  )
  tl.to(pktAckFin1, { opacity: 0, duration: 0.3 }, 'step3+=5.2')

  // 客户端收到 ACK，进入 FIN_WAIT_2 (半关闭等待服务端剩余数据)
  tl.to(clientState, { textContent: 'FIN_WAIT_2', duration: 0.3 }, 'step3+=5.3')

  /* ==========================================================
     阶段 4: 完全关闭 - 服务端 FIN 与 2MSL TIME_WAIT (17.5s ~ 23.0s)
     ========================================================== */
  tl.addLabel('step4', 17.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.0 }, 1.2)
    options.onStepChange?.(3)
  }, undefined, 'step4')

  // 服务端数据发送完毕，转为 LAST_ACK
  tl.to(serverState, { textContent: 'LAST_ACK', duration: 0.3 }, 'step4+=0.2')

  // 挥手 3: 服务端 -> 客户端 FIN=1, ACK=1, seq=w, ack=u+1
  tl.fromTo(
    pktFin2,
    { opacity: 0, x: 380, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step4+=0.5'
  )
  tl.to(
    pktFin2,
    { x: 0, duration: 1.4, ease: 'power1.inOut' },
    'step4+=0.9'
  )
  tl.to(pktFin2, { opacity: 0, duration: 0.3 }, 'step4+=2.3')

  // 客户端收到服务端的 FIN，进入 TIME_WAIT
  tl.to(clientState, { textContent: 'TIME_WAIT', duration: 0.3 }, 'step4+=2.4')

  // 挥手 4: 客户端 -> 服务端 ACK=1, seq=u+1, ack=w+1
  tl.fromTo(
    pktAckFin2,
    { opacity: 0, x: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(1.5)' },
    'step4+=2.6'
  )
  tl.to(
    pktAckFin2,
    { x: 380, duration: 1.3, ease: 'power1.inOut' },
    'step4+=3.0'
  )
  tl.to(pktAckFin2, { opacity: 0, duration: 0.3 }, 'step4+=4.3')

  // 服务端收到最终 ACK，彻底转为 CLOSED
  tl.to(serverState, { textContent: 'CLOSED', duration: 0.3 }, 'step4+=4.4')

  // 客户端弹出 2MSL 倒计时与保护期解析卡片
  tl.fromTo(
    timeWaitBox,
    { opacity: 0, scale: 0.8, y: 15 },
    { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' },
    'step4+=2.8'
  )
  tl.to(mslCountdownVal, { textContent: '120s (2 × 60s MSL)', duration: 0.1 }, 'step4+=3.0')
  tl.to(mslCountdownVal, { textContent: '60s ...', duration: 0.8 }, 'step4+=3.5')
  tl.to(mslCountdownVal, { textContent: '0s (Timer Expired)', duration: 0.6 }, 'step4+=4.6')

  // 客户端 2MSL 计时到期，转为 CLOSED
  tl.to(clientState, { textContent: 'CLOSED', duration: 0.3 }, 'step4+=4.9')

  // 严格确保总时长精确对齐 23.0 秒
  tl.set({}, {}, 23.0)

  return tl
}
