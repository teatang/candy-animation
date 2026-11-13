import { describe, it, expect } from 'vitest'
import { router } from '@/router'
import { DEFAULT_MODULE_ID } from '@/modules'

describe('Vue Router & Dedicated URL Direct Navigation', () => {
  it('should resolve root / to Home view', async () => {
    await router.push('/')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.name).toBe('Home')
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

  it('should navigate directly to dedicated WebSocket animation URL /websocket-protocol', async () => {
    await router.push('/websocket-protocol')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/websocket-protocol')
    expect(router.currentRoute.value.params.moduleId).toBe('websocket-protocol')
  })

  it('should navigate directly to dedicated TCP/IP animation URL /tcp-ip-protocol', async () => {
    await router.push('/tcp-ip-protocol')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/tcp-ip-protocol')
    expect(router.currentRoute.value.params.moduleId).toBe('tcp-ip-protocol')
  })

  it('should navigate directly to dedicated SHA-256 animation URL /sha256-algorithm', async () => {
    await router.push('/sha256-algorithm')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/sha256-algorithm')
    expect(router.currentRoute.value.params.moduleId).toBe('sha256-algorithm')
  })

  it('should navigate directly to dedicated TCP Handshake & Wave animation URL /tcp-handshake-wave', async () => {
    await router.push('/tcp-handshake-wave')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/tcp-handshake-wave')
    expect(router.currentRoute.value.params.moduleId).toBe('tcp-handshake-wave')
  })

  it('should redirect unknown routes to home /', async () => {
    await router.push('/unknown-random-animation-id')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/')
  })

  it('should support step query parameter ?step=3 for direct deep-linking', async () => {
    await router.push('/https-handshake?step=3')
    await router.isReady()
    expect(router.currentRoute.value.path).toBe('/https-handshake')
    expect(router.currentRoute.value.query.step).toBe('3')
  })
})
