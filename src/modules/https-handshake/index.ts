import type { AnimationModule } from '@/types/animation'

/**
 * HTTPS 握手与加密传输原理模块配置
 */
export const httpsHandshakeModule: AnimationModule = {
  id: 'https-handshake',
  titleKey: 'modules.https.title',
  summaryKey: 'modules.https.summary',
  categoryKey: 'modules.https.category',
  categoryColor: '#06b6d4',
  totalDuration: 23,
  steps: [
    {
      id: 'tcp-handshake',
      stepNumber: 1,
      titleKey: 'modules.https.steps.step1.title',
      badgeKey: 'modules.https.steps.step1.badge',
      descriptionKey: 'modules.https.steps.step1.description',
      duration: 5.5,
      camera: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      },
    },
    {
      id: 'tls-hello',
      stepNumber: 2,
      titleKey: 'modules.https.steps.step2.title',
      badgeKey: 'modules.https.steps.step2.badge',
      descriptionKey: 'modules.https.steps.step2.description',
      duration: 6,
      camera: {
        x: 0,
        y: -10,
        scale: 1.15,
        rotation: 0,
      },
    },
    {
      id: 'ca-verify',
      stepNumber: 3,
      titleKey: 'modules.https.steps.step3.title',
      badgeKey: 'modules.https.steps.step3.badge',
      descriptionKey: 'modules.https.steps.step3.description',
      duration: 5.5,
      camera: {
        x: 180,
        y: 10,
        scale: 1.35,
        rotation: 0,
      },
    },
    {
      id: 'symmetric-encryption',
      stepNumber: 4,
      titleKey: 'modules.https.steps.step4.title',
      badgeKey: 'modules.https.steps.step4.badge',
      descriptionKey: 'modules.https.steps.step4.description',
      duration: 6,
      camera: {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
      },
    },
  ],
}
