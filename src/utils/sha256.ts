/**
 * SHA-256 哈希算法纯 TypeScript 实现
 * 用于原理解析与雪崩效应实时计算比对
 */

function rotr(n: number, b: number): number {
  return (n >>> b) | (n << (32 - b))
}

function ch(x: number, y: number, z: number): number {
  return (x & y) ^ (~x & z)
}

function maj(x: number, y: number, z: number): number {
  return (x & y) ^ (x & z) ^ (y & z)
}

function sigma0(x: number): number {
  return rotr(x, 2) ^ rotr(x, 13) ^ rotr(x, 22)
}

function sigma1(x: number): number {
  return rotr(x, 6) ^ rotr(x, 11) ^ rotr(x, 25)
}

function gamma0(x: number): number {
  return rotr(x, 7) ^ rotr(x, 18) ^ (x >>> 3)
}

function gamma1(x: number): number {
  return rotr(x, 17) ^ rotr(x, 19) ^ (x >>> 10)
}

/**
 * 64 个轮次常数 K
 */
const K: number[] = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
]

/**
 * 计算输入文本的 SHA-256 十六进制散列值
 */
export function computeSha256(text: string): string {
  const encoder = new TextEncoder()
  const bytes = Array.from(encoder.encode(text))
  const bitLength = bytes.length * 8

  // 1. 追加单个 1 位 (0x80)
  bytes.push(0x80)

  // 2. 补零直至 (length % 64) === 56
  while ((bytes.length % 64) !== 56) {
    bytes.push(0)
  }

  // 3. 追加 64 位大端序原始位长
  const highBits = Math.floor(bitLength / 0x100000000)
  const lowBits = bitLength >>> 0
  for (let i = 3; i >= 0; i--) bytes.push((highBits >>> (i * 8)) & 0xff)
  for (let i = 3; i >= 0; i--) bytes.push((lowBits >>> (i * 8)) & 0xff)

  // 初始哈希变量 (前8个素数平方根的小数部分)
  let h0 = 0x6a09e667
  let h1 = 0xbb67ae85
  let h2 = 0x3c6ef372
  let h3 = 0xa54ff53a
  let h4 = 0x510e527f
  let h5 = 0x9b05688c
  let h6 = 0x1f83d9ab
  let h7 = 0x5be0cd19

  // 按 512 位 (64 字节) 分组处理
  for (let i = 0; i < bytes.length; i += 64) {
    const w = new Array<number>(64)

    // 前 16 个字直接由消息分组拆解
    for (let t = 0; t < 16; t++) {
      const idx = i + t * 4
      w[t] =
        (bytes[idx] << 24) |
        (bytes[idx + 1] << 16) |
        (bytes[idx + 2] << 8) |
        bytes[idx + 3]
    }

    // 消息调度扩展到 64 个字
    for (let t = 16; t < 64; t++) {
      w[t] = ((gamma1(w[t - 2]) + w[t - 7] + gamma0(w[t - 15]) + w[t - 16]) >>> 0)
    }

    let a = h0
    let b = h1
    let c = h2
    let d = h3
    let e = h4
    let f = h5
    let g = h6
    let h = h7

    // 64 轮主压缩循环
    for (let t = 0; t < 64; t++) {
      const t1 = (h + sigma1(e) + ch(e, f, g) + K[t] + w[t]) >>> 0
      const t2 = (sigma0(a) + maj(a, b, c)) >>> 0
      h = g
      g = f
      f = e
      e = (d + t1) >>> 0
      d = c
      c = b
      b = a
      a = (t1 + t2) >>> 0
    }

    h0 = (h0 + a) >>> 0
    h1 = (h1 + b) >>> 0
    h2 = (h2 + c) >>> 0
    h3 = (h3 + d) >>> 0
    h4 = (h4 + e) >>> 0
    h5 = (h5 + f) >>> 0
    h6 = (h6 + g) >>> 0
    h7 = (h7 + h) >>> 0
  }

  const toHex = (n: number) => n.toString(16).padStart(8, '0')
  return toHex(h0) + toHex(h1) + toHex(h2) + toHex(h3) + toHex(h4) + toHex(h5) + toHex(h6) + toHex(h7)
}

/**
 * 将 64 字符十六进制转为 256 位二进制数组
 */
export function sha256HexToBits(hex: string): number[] {
  const bits: number[] = []
  for (let i = 0; i < hex.length; i++) {
    const val = parseInt(hex[i], 16)
    for (let b = 3; b >= 0; b--) {
      bits.push((val >> b) & 1)
    }
  }
  return bits
}

/**
 * 比较两个 SHA-256 结果的雪崩效应位差异
 */
export function compareSha256Avalanche(
  hashA: string,
  hashB: string
): {
  bitsA: number[]
  bitsB: number[]
  diffCount: number
  totalBits: number
  diffRatio: number
} {
  const bitsA = sha256HexToBits(hashA)
  const bitsB = sha256HexToBits(hashB)
  const totalBits = Math.max(bitsA.length, bitsB.length)
  let diffCount = 0

  for (let i = 0; i < totalBits; i++) {
    if (bitsA[i] !== bitsB[i]) {
      diffCount++
    }
  }

  return {
    bitsA,
    bitsB,
    diffCount,
    totalBits,
    diffRatio: totalBits > 0 ? (diffCount / totalBits) * 100 : 0,
  }
}
