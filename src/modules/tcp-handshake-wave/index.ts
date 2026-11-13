import type { AnimationModule } from '@/types/animation'

/**
 * TCP 协议三次握手与四次挥手原理模块配置
 */
export const tcpHandshakeWaveModule: AnimationModule = {
  id: 'tcp-handshake-wave',
  categoryId: 'network',
  titleKey: 'modules.tcphandshake.title',
  summaryKey: 'modules.tcphandshake.summary',
  categoryKey: 'modules.tcphandshake.category',
  categoryColor: '#ec4899',
  totalDuration: 23,
  steps: [
    {
      id: 'tcp-handshake-syn',
      stepNumber: 1,
      titleKey: 'modules.tcphandshake.steps.step1.title',
      badgeKey: 'modules.tcphandshake.steps.step1.badge',
      descriptionKey: 'modules.tcphandshake.steps.step1.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: -25,
        scale: 1.15,
        rotation: 0,
      },
    },
    {
      id: 'tcp-handshake-ack',
      stepNumber: 2,
      titleKey: 'modules.tcphandshake.steps.step2.title',
      badgeKey: 'modules.tcphandshake.steps.step2.badge',
      descriptionKey: 'modules.tcphandshake.steps.step2.description',
      duration: 6,
      camera: {
        x: 0,
        y: -10,
        scale: 1.2,
        rotation: 0,
      },
    },
    {
      id: 'tcp-wave-fin1',
      stepNumber: 3,
      titleKey: 'modules.tcphandshake.steps.step3.title',
      badgeKey: 'modules.tcphandshake.steps.step3.badge',
      descriptionKey: 'modules.tcphandshake.steps.step3.description',
      duration: 6,
      camera: {
        x: 0,
        y: 15,
        scale: 1.2,
        rotation: 0,
      },
    },
    {
      id: 'tcp-wave-time-wait',
      stepNumber: 4,
      titleKey: 'modules.tcphandshake.steps.step4.title',
      badgeKey: 'modules.tcphandshake.steps.step4.badge',
      descriptionKey: 'modules.tcphandshake.steps.step4.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: 0,
        scale: 1.0,
        rotation: 0,
      },
    },
  ],
}
