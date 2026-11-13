import type { AnimationModule } from '@/types/animation'

/**
 * WebSocket 全双工通信协议原理模块配置
 */
export const websocketProtocolModule: AnimationModule = {
  id: 'websocket-protocol',
  categoryId: 'network',
  titleKey: 'modules.websocket.title',
  summaryKey: 'modules.websocket.summary',
  categoryKey: 'modules.websocket.category',
  categoryColor: '#10b981',
  totalDuration: 23,
  steps: [
    {
      id: 'ws-handshake',
      stepNumber: 1,
      titleKey: 'modules.websocket.steps.step1.title',
      badgeKey: 'modules.websocket.steps.step1.badge',
      descriptionKey: 'modules.websocket.steps.step1.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: -10,
        scale: 1.15,
        rotation: 0,
      },
    },
    {
      id: 'ws-frame-mask',
      stepNumber: 2,
      titleKey: 'modules.websocket.steps.step2.title',
      badgeKey: 'modules.websocket.steps.step2.badge',
      descriptionKey: 'modules.websocket.steps.step2.description',
      duration: 6,
      camera: {
        x: 0,
        y: 15,
        scale: 1.35,
        rotation: 0,
      },
    },
    {
      id: 'ws-full-duplex',
      stepNumber: 3,
      titleKey: 'modules.websocket.steps.step3.title',
      badgeKey: 'modules.websocket.steps.step3.badge',
      descriptionKey: 'modules.websocket.steps.step3.description',
      duration: 6,
      camera: {
        x: 0,
        y: 0,
        scale: 1.05,
        rotation: 0,
      },
    },
    {
      id: 'ws-graceful-close',
      stepNumber: 4,
      titleKey: 'modules.websocket.steps.step4.title',
      badgeKey: 'modules.websocket.steps.step4.badge',
      descriptionKey: 'modules.websocket.steps.step4.description',
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
