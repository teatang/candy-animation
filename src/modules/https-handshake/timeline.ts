import gsap from 'gsap'
import type { useCamera } from '@/composables/useCamera'

/**
 * 创建 HTTPS 握手与加密传输动画时间轴
 * @param stageEl 舞台根 DOM 元素引用
 * @param camera 虚拟镜头控制器
 * @param options 可选配置（如中间人篡改状态）
 */
export function createHttpsTimeline(
  stageEl: HTMLElement,
  camera: ReturnType<typeof useCamera>,
  options: { isTampered: () => boolean; onStepChange?: (step: number) => void }
): gsap.core.Timeline {
  const q = gsap.utils.selector(stageEl)
  const tl = gsap.timeline({ defaults: { ease: 'power2.inOut' } })

  // 快捷获取选择器
  const clientNode = q('.client-node')
  const serverNode = q('.server-node')
  const clientStatus = q('.client-status-text')
  const serverStatus = q('.server-status-text')
  const tcpPipe = q('.tcp-pipe-line')
  const packetSyn = q('.packet-syn')
  const packetSynAck = q('.packet-syn-ack')
  const packetAck = q('.packet-ack')
  const packetClientHello = q('.packet-client-hello')
  const packetServerHello = q('.packet-server-hello')
  const packetPreMaster = q('.packet-pre-master')
  const encryptedStream = q('.encrypted-stream')
  const certBadge = q('.cert-badge')
  const clientVault = q('.client-vault')
  const mitmZone = q('.mitm-attack-zone')
  const mitmAlert = q('.mitm-alert-box')
  const sessionKeyClient = q('.session-key-client')
  const sessionKeyServer = q('.session-key-server')

  // 初始隐藏所有瞬态报文与特效
  gsap.set(
    [
      packetSyn,
      packetSynAck,
      packetAck,
      packetClientHello,
      packetServerHello,
      packetPreMaster,
      encryptedStream,
      certBadge,
      mitmAlert,
      sessionKeyClient,
      sessionKeyServer,
    ],
    { opacity: 0, scale: 0.8 }
  )

  gsap.set(tcpPipe, { strokeDasharray: 400, strokeDashoffset: 400 })

  /* ==========================================================
     阶段 1: TCP 三次握手建立基础通信通道 (0s ~ 5.5s)
     ========================================================== */
  tl.addLabel('step1', 0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1 }, 1)
    options.onStepChange?.(0)
  }, undefined, 'step1')

  // 客户端发出 SYN
  tl.to(clientStatus, { textContent: 'SYN_SENT', duration: 0.3 }, 'step1+=0.2')
  tl.fromTo(
    packetSyn,
    { opacity: 0, x: -220, y: -20, scale: 0.7 },
    { opacity: 1, x: 220, y: -20, scale: 1, duration: 1.4, ease: 'power1.inOut' },
    'step1+=0.5'
  )
  tl.to(packetSyn, { opacity: 0, duration: 0.2 }, 'step1+=1.9')

  // 服务端收到 SYN，返回 SYN+ACK
  tl.to(serverStatus, { textContent: 'SYN_RCVD', duration: 0.3 }, 'step1+=1.9')
  tl.fromTo(
    packetSynAck,
    { opacity: 0, x: 220, y: 20, scale: 0.7 },
    { opacity: 1, x: -220, y: 20, scale: 1, duration: 1.4, ease: 'power1.inOut' },
    'step1+=2.2'
  )
  tl.to(packetSynAck, { opacity: 0, duration: 0.2 }, 'step1+=3.6')

  // 客户端收到 SYN+ACK，回复 ACK
  tl.to(clientStatus, { textContent: 'ESTABLISHED', duration: 0.3 }, 'step1+=3.6')
  tl.fromTo(
    packetAck,
    { opacity: 0, x: -220, y: 0, scale: 0.7 },
    { opacity: 1, x: 220, y: 0, scale: 1, duration: 1.2, ease: 'power1.inOut' },
    'step1+=3.8'
  )
  tl.to(packetAck, { opacity: 0, duration: 0.2 }, 'step1+=5.0')
  tl.to(serverStatus, { textContent: 'ESTABLISHED', duration: 0.3 }, 'step1+=5.0')

  // TCP 通道连通发光
  tl.to(tcpPipe, { strokeDashoffset: 0, duration: 0.6 }, 'step1+=4.6')

  /* ==========================================================
     阶段 2: TLS ClientHello 与 ServerHello 协商 (5.5s ~ 11.5s)
     ========================================================== */
  tl.addLabel('step2', 5.5)
  tl.call(() => {
    camera.animateTo({ x: 0, y: -10, scale: 1.15 }, 1.2)
    options.onStepChange?.(1)
  }, undefined, 'step2')

  // 客户端发出 ClientHello
  tl.to(clientStatus, { textContent: 'TLS_CLIENT_HELLO', duration: 0.3 }, 'step2+=0.2')
  tl.fromTo(
    packetClientHello,
    { opacity: 0, x: -220, y: -30, scale: 0.7 },
    { opacity: 1, x: 220, y: -30, scale: 1, duration: 2.0, ease: 'power1.inOut' },
    'step2+=0.5'
  )
  tl.to(packetClientHello, { opacity: 0, duration: 0.3 }, 'step2+=2.5')

  // 服务端收到并发出 ServerHello + 证书 + 公钥
  tl.to(serverStatus, { textContent: 'TLS_SERVER_HELLO', duration: 0.3 }, 'step2+=2.6')
  tl.fromTo(
    packetServerHello,
    { opacity: 0, x: 220, y: 30, scale: 0.7 },
    { opacity: 1, x: -220, y: 30, scale: 1, duration: 2.2, ease: 'power1.inOut' },
    'step2+=2.9'
  )
  tl.to(packetServerHello, { opacity: 0, duration: 0.3 }, 'step2+=5.1')

  /* ==========================================================
     阶段 3: CA 证书合法性链式校验与防篡改 (11.5s ~ 17.0s)
     ========================================================== */
  tl.addLabel('step3', 11.5)
  tl.call(() => {
    // 镜头特写推进至客户端本地密码学保管库
    camera.animateTo({ x: 180, y: 10, scale: 1.35 }, 1.4)
    options.onStepChange?.(2)
  }, undefined, 'step3')

  // 客户端显示证书与根 CA 校验卡片
  tl.to(clientStatus, { textContent: 'VERIFYING_CERT', duration: 0.3 }, 'step3+=0.3')
  tl.to(certBadge, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, 'step3+=0.5')
  tl.to(clientVault, { borderColor: '#10b981', boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)', duration: 0.5 }, 'step3+=0.8')

  // 检查是否触发中间人篡改分支
  tl.call(() => {
    if (options.isTampered()) {
      gsap.to(mitmAlert, { opacity: 1, scale: 1, duration: 0.4 })
      gsap.to(clientStatus, { textContent: 'ALERT: CERT_INVALID', duration: 0.2 })
      gsap.to(clientVault, { borderColor: '#ef4444', boxShadow: '0 0 25px rgba(239, 68, 68, 0.6)' })
    } else {
      gsap.to(mitmAlert, { opacity: 0, scale: 0.8, duration: 0.2 })
      gsap.to(clientStatus, { textContent: 'CERT_VALIDATED', duration: 0.3 })
    }
  }, undefined, 'step3+=2.0')

  tl.to(certBadge, { opacity: 0.8, duration: 0.5 }, 'step3+=4.8')

  /* ==========================================================
     阶段 4: 密钥派生与对称加密安全传输 (17.0s ~ 23.0s)
     ========================================================== */
  tl.addLabel('step4', 17.0)
  tl.call(() => {
    camera.animateTo({ x: 0, y: 0, scale: 1.0 }, 1.4)
    options.onStepChange?.(3)
  }, undefined, 'step4')

  // 客户端生成 Pre-Master Secret 并用服务端公钥加密发送
  tl.to(clientStatus, { textContent: 'SENDING_PMS', duration: 0.3 }, 'step4+=0.2')
  tl.fromTo(
    packetPreMaster,
    { opacity: 0, x: -220, y: 0, scale: 0.7 },
    { opacity: 1, x: 220, y: 0, scale: 1, duration: 1.8, ease: 'power1.inOut' },
    'step4+=0.5'
  )
  tl.to(packetPreMaster, { opacity: 0, duration: 0.3 }, 'step4+=2.3')

  // 两侧同时计算出一致的对称会话密钥 (Session Key)
  tl.to([sessionKeyClient, sessionKeyServer], {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'back.out(2)',
  }, 'step4+=2.5')

  tl.to(clientStatus, { textContent: 'SECURE_CONNECTED', duration: 0.3 }, 'step4+=2.8')
  tl.to(serverStatus, { textContent: 'SECURE_CONNECTED', duration: 0.3 }, 'step4+=2.8')

  // 镜头拉远，后续 HTTP 加密数据流全速喷涌传输
  tl.to(encryptedStream, { opacity: 1, duration: 0.6 }, 'step4+=3.2')
  tl.fromTo(
    encryptedStream,
    { strokeDashoffset: 100 },
    { strokeDashoffset: 0, duration: 2.8, ease: 'none', repeat: -1 },
    'step4+=3.2'
  )

  return tl
}
