import { describe, it, expect } from 'vitest'
import { router } from '@/router'
import { DEFAULT_MODULE_ID } from '@/modules'

describe('Vue Router & Dedicated URL Direct Navigation', () => {
  it('should redirect root / to the default animation module URL', async () => {
    await router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe(`/${DEFAULT_MODULE_ID}`)
    expect(router.currentRoute.value.params.moduleId).toBe(DEFAULT_MODULE_ID)
  })

  it('should navigate directly to dedicated HTTPS animation URL /https-handshake', async () => {
    await router.push('/https-handshake')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/https-handshake')
    expect(router.currentRoute.value.params.moduleId).toBe('https-handshake')
  })

  it('should navigate directly to dedicated MD5 animation URL /md5-algorithm', async () => {
    await router.push('/md5-algorithm')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/md5-algorithm')
    expect(router.currentRoute.value.params.moduleId).toBe('md5-algorithm')
  })

  it('should redirect unknown routes to default module URL', async () => {
    await router.push('/unknown-random-animation-id')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe(`/${DEFAULT_MODULE_ID}`)
  })

  it('should support step query parameter ?step=3 for direct deep-linking', async () => {
    await router.push('/https-handshake?step=3')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/https-handshake')
    expect(router.currentRoute.value.query.step).toBe('3')
  })
})
