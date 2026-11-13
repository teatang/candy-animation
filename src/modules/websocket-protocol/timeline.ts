import gsap from 'gsap'
import type { useCamera } from '@/composables/useCamera'

/**
 * 创建 WebSocket 全双工协议原理动画时间轴
 * @param stageEl 舞台根 DOM 元素
 * @param camera 虚拟镜头控制器
 * @param options 回调配置
 */
export function createWebsocketTimeline(
  stageEl: HTMLElement,
  camera: ReturnType<typeof useCamera>,
  options: { onStepChange?: (step: number) => void }
): gsap.core.Timeline {
  const q = gsap.utils.selector(stageEl)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  const clientStatus = q('.ws-client-status')
  const serverStatus = q('.ws-server-status')
  const socketPipe = q('.ws-socket-pipe')
  const packetUpgradeReq = q('.packet-upgrade-req')
  const packetUpgradeResp = q('.packet-upgrade-resp')
  const frameInspectionBox = q('.ws-frame-inspection-box')
  const fullDuplexLane = q('.ws-full-duplex-lane')
  const packetClientMsg = q('.packet-client-msg')
  const packetServerPush = q('.packet-server-push')
  const packetPing = q('.packet-ping')
  const packetPong = q('.packet-pong')
  const closeHandshakeBox = q('.ws-close-handshake-box')
  const channelBadge = q('.ws-channel-badge')

  // 初始隐藏瞬态节点
  gsap.set(
    [
      packetUpgradeReq,
      packetUpgradeResp,
      frameInspectionBox,
      fullDuplexLane,
      packetClientMsg,
      packetServerPush,
      packetPing,
      packetPong,
      closeHandshakeBox,
    ],
    { opacity: 0, scale: 0.8 }
  )

  gsap.set(socketPipe, { strokeDasharray: 400, strokeDashoffset: 400 })

  /* ==========================================================
     阶段 1: HTTP 升级协商与 Sec-WebSocket 握手 (0s ~ 5.5s)
     ========================================================== */
  tl.addLabel('step1', 0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: -10, scale: 1.15 }, 1.0)
    options.onStepChange?.(0)
  }, undefined, 'step1')

  tl.to(clientStatus, { textContent: 'HTTP_UPGRADE_SENT', duration: 0.3 }, 'step1+=0.2')

  // 客户端发出 Upgrade 请求报文
  tl.fromTo(
    packetUpgradeReq,
    { opacity: 0, x: -220, y: -25, scale: 0.7 },
    { opacity: 1, x: 220, y: -25, scale: 1, duration: 1.8, ease: 'power1.inOut' },
    'step1+=0.4'
  )
  tl.to(packetUpgradeReq, { opacity: 0, duration: 0.3 }, 'step1+=2.2')

  // 服务端返回 101 Switching Protocols
  tl.to(serverStatus, { textContent: '101_SWITCHING_PROTOCOLS', duration: 0.3 }, 'step1+=2.2')
  tl.fromTo(
    packetUpgradeResp,
    { opacity: 0, x: 220, y: 25, scale: 0.7 },
    { opacity: 1, x: -220, y: 25, scale: 1, duration: 1.8, ease: 'power1.inOut' },
    'step1+=2.5'
  )
  tl.to(packetUpgradeResp, { opacity: 0, duration: 0.3 }, 'step1+=4.3')

  // 双向通道建立点亮
  tl.to(socketPipe, { strokeDashoffset: 0, duration: 0.8 }, 'step1+=4.2')
  tl.to(channelBadge, { textContent: 'PROTOCOL: WebSocket (ws://)', duration: 0.3 }, 'step1+=4.5')
  tl.to([clientStatus, serverStatus], { textContent: 'WS_OPEN', duration: 0.3 }, 'step1+=4.6')

  /* ==========================================================
     阶段 2: 数据帧结构解析与客户端掩码机制 (5.5s ~ 11.5s)
     ========================================================== */
  tl.addLabel('step2', 5.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 15, scale: 1.35 }, 1.2)
    options.onStepChange?.(1)
  }, undefined, 'step2')

  tl.to(frameInspectionBox, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }, 'step2+=0.3')

  // 模拟二进制帧各字段高亮微动
  tl.fromTo(
    q('.frame-field'),
    { y: 15, opacity: 0 },
    { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
    'step2+=0.6'
  )

  // 掩码 XOR 变换动画
  tl.to(q('.mask-xor-glow'), {
    boxShadow: '0 0 20px rgba(16, 185, 129, 0.6)',
    duration: 1.2,
    yoyo: true,
    repeat: 1,
  }, 'step2+=2.5')

  /* ==========================================================
     阶段 3: 双向全双工并发流与心跳保活 (Ping/Pong) (11.5s ~ 17.5s)
     ========================================================== */
  tl.addLabel('step3', 11.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.05 }, 1.2)
    options.onStepChange?.(2)
  }, undefined, 'step3')

  tl.to(frameInspectionBox, { opacity: 0.15, duration: 0.4 }, 'step3+=0.1')
  tl.to(fullDuplexLane, { opacity: 1, duration: 0.5 }, 'step3+=0.2')

  // 客户端并发发送消息 ->
  tl.fromTo(
    packetClientMsg,
    { opacity: 0, x: -220, y: -20, scale: 0.7 },
    { opacity: 1, x: 220, y: -20, scale: 1, duration: 1.6, ease: 'power1.inOut' },
    'step3+=0.5'
  )
  tl.to(packetClientMsg, { opacity: 0, duration: 0.2 }, 'step3+=2.1')

  // 同时服务端推送数据 <- (无需等待客户端请求)
  tl.fromTo(
    packetServerPush,
    { opacity: 0, x: 220, y: 20, scale: 0.7 },
    { opacity: 1, x: -220, y: 20, scale: 1, duration: 1.6, ease: 'power1.inOut' },
    'step3+=1.2'
  )
  tl.to(packetServerPush, { opacity: 0, duration: 0.2 }, 'step3+=2.8')

  // 发送 Ping (0x9) 心跳
  tl.fromTo(
    packetPing,
    { opacity: 0, x: -220, y: 0, scale: 0.7 },
    { opacity: 1, x: 220, y: 0, scale: 1, duration: 1.2, ease: 'power1.inOut' },
    'step3+=3.2'
  )
  tl.to(packetPing, { opacity: 0, duration: 0.2 }, 'step3+=4.4')

  // 快速响应 Pong (0xA) 心跳
  tl.fromTo(
    packetPong,
    { opacity: 0, x: 220, y: 0, scale: 0.7 },
    { opacity: 1, x: -220, y: 0, scale: 1, duration: 1.2, ease: 'power1.inOut' },
    'step3+=4.5'
  )
  tl.to(packetPong, { opacity: 0, duration: 0.2 }, 'step3+=5.7')

  /* ==========================================================
     阶段 4: 连接优雅关闭握手 (Close Handshake) (17.5s ~ 23.0s)
     ========================================================== */
  tl.addLabel('step4', 17.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.0 }, 1.2)
    options.onStepChange?.(3)
  }, undefined, 'step4')

  tl.to([fullDuplexLane, frameInspectionBox], { opacity: 0, duration: 0.3 }, 'step4+=0.1')
  tl.to(closeHandshakeBox, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' }, 'step4+=0.3')

  tl.to([clientStatus, serverStatus], { textContent: 'WS_CLOSING', duration: 0.3 }, 'step4+=0.5')

  // 通道断开淡出
  tl.to(socketPipe, { strokeDashoffset: 400, duration: 1.0 }, 'step4+=2.5')
  tl.to(channelBadge, { textContent: 'STATUS: DISCONNECTED (1000 Normal)', duration: 0.3 }, 'step4+=3.0')
  tl.to([clientStatus, serverStatus], { textContent: 'WS_CLOSED', duration: 0.3 }, 'step4+=3.2')

  // 严格确保总时长精确对齐 23.0 秒
  tl.set({}, {}, 23.0)

  return tl
}
