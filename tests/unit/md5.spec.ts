import { describe, it, expect } from 'vitest'
import {
  computeMd5,
  stringToLittleEndianWords,
  compareAvalanche,
  rotateLeft,
  F,
  G,
  H,
  I,
} from '@/utils/md5'

describe('MD5 Utility & Cryptographic Algorithms', () => {
  it('should compute standard RFC 1321 test vectors correctly', () => {
    // 空字符串的标准 MD5
    expect(computeMd5('')).toBe('d41d8cd98f00b204e9800998ecf8427e')

    // "a" 的标准 MD5
    expect(computeMd5('a')).toBe('0cc175b9c0f1b6a831c399e269772661')

    // "abc" 的标准 MD5
    expect(computeMd5('abc')).toBe('900150983cd24fb0d6963f7d28e17f72')

    // "message digest" 的标准 MD5
    expect(computeMd5('message digest')).toBe('f96b697d7cb7938d525a2f31aaf161d0')
  })

  it('should correctly pad bitstreams to 512-bit boundaries', () => {
    const { words, originalLengthBits } = stringToLittleEndianWords('Candy')
    // "Candy" 5 个字节 = 40 bits
    expect(originalLengthBits).toBe(40)

    // 填充后应该恰好是 16 个 32-bit 字 (512 bits)
    expect(words.length % 16).toBe(0)
    expect(words.length).toBe(16)

    // 倒数第二个字包含原始长度低 32 位
    expect(words[14]).toBe(40)
    // 倒数第一个字包含原始长度高 32 位
    expect(words[15]).toBe(0)
  })

  it('should evaluate non-linear boolean functions F, G, H, I correctly', () => {
    const b = 0x0f0f0f0f
    const c = 0x33333333
    const d = 0x55555555

    expect(F(b, c, d)).toBe((b & c) | (~b & d))
    expect(G(b, c, d)).toBe((b & d) | (c & ~d))
    expect(H(b, c, d)).toBe(b ^ c ^ d)
    expect(I(b, c, d)).toBe(c ^ (b | ~d))
  })

  it('should perform circular left shifts correctly', () => {
    // 0x80000000 循环左移 1 位应为 0x00000001
    expect(rotateLeft(0x80000000, 1)).toBe(1)
    // 0x12345678 循环左移 32 位应保持不变
    expect(rotateLeft(0x12345678, 32)).toBe(0x12345678)
  })

  it('should compute avalanche effect difference accurately', () => {
    const hashA = computeMd5('Candy')
    const hashB = computeMd5('candy') // 仅首字母大小写差异 1 个字符

    const avalanche = compareAvalanche(hashA, hashB)
    expect(avalanche.totalBits).toBe(128)
    expect(avalanche.differingCount).toBeGreaterThan(30) // 剧烈雪崩扩散
    expect(avalanche.differingRatio).toBeGreaterThan(25)
    expect(avalanche.bitsA.length).toBe(128)
    expect(avalanche.bitsB.length).toBe(128)
  })
})
