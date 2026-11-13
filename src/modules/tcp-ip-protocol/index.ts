import type { AnimationModule } from '@/types/animation'

/**
 * TCP/IP 协议栈分层与数据包封装原理模块配置
 */
export const tcpIpProtocolModule: AnimationModule = {
  id: 'tcp-ip-protocol',
  categoryId: 'network',
  titleKey: 'modules.tcpip.title',
  summaryKey: 'modules.tcpip.summary',
  categoryKey: 'modules.tcpip.category',
  categoryColor: '#3b82f6',
  totalDuration: 23,
  steps: [
    {
      id: 'tcpip-app-to-tcp',
      stepNumber: 1,
      titleKey: 'modules.tcpip.steps.step1.title',
      badgeKey: 'modules.tcpip.steps.step1.badge',
      descriptionKey: 'modules.tcpip.steps.step1.description',
      duration: 5.5,
      camera: {
        x: -140,
        y: -20,
        scale: 1.25,
        rotation: 0,
      },
    },
    {
      id: 'tcpip-network-ip',
      stepNumber: 2,
      titleKey: 'modules.tcpip.steps.step2.title',
      badgeKey: 'modules.tcpip.steps.step2.badge',
      descriptionKey: 'modules.tcpip.steps.step2.description',
      duration: 5.5,
      camera: {
        x: -100,
        y: 10,
        scale: 1.25,
        rotation: 0,
      },
    },
    {
      id: 'tcpip-datalink-eth',
      stepNumber: 3,
      titleKey: 'modules.tcpip.steps.step3.title',
      badgeKey: 'modules.tcpip.steps.step3.badge',
      descriptionKey: 'modules.tcpip.steps.step3.description',
      duration: 6,
      camera: {
        x: 0,
        y: 0,
        scale: 1.05,
        rotation: 0,
      },
    },
    {
      id: 'tcpip-decapsulation',
      stepNumber: 4,
      titleKey: 'modules.tcpip.steps.step4.title',
      badgeKey: 'modules.tcpip.steps.step4.badge',
      descriptionKey: 'modules.tcpip.steps.step4.description',
      duration: 6,
      camera: {
        x: 140,
        y: 0,
        scale: 1.2,
        rotation: 0,
      },
    },
  ],
}
