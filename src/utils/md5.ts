/**
 * 标准 MD5 算法纯 TypeScript 实现
 * 用于展示与交互式雪崩效应实时计算
 */

/**
 * 循环左移 (Circular Left Shift)
 */
export function rotateLeft(x: number, s: number): number {
  return (x << s) | (x >>> (32 - s))
}

/**
 * 32位无符号模加运算
 */
export function addUnsigned(x: number, y: number): number {
  const lsw = (x & 0xffff) + (y & 0xffff)
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xffff)
}

/**
 * 第 1 轮非线性布尔函数 F
 */
export function F(b: number, c: number, d: number): number {
  return (b & c) | (~b & d)
}

/**
 * 第 2 轮非线性布尔函数 G
 */
export function G(b: number, c: number, d: number): number {
  return (b & d) | (c & ~d)
}

/**
 * 第 3 轮非线性布尔函数 H
 */
export function H(b: number, c: number, d: number): number {
  return b ^ c ^ d
}

/**
 * 第 4 轮非线性布尔函数 I
 */
export function I(b: number, c: number, d: number): number {
  return c ^ (b | ~d)
}

/**
 * 将字符串编码转换为 32 位小端序整数数组（包含标准填充过程）
 * @param str 输入明文字符串
 */
export function stringToLittleEndianWords(str: number[] | string): { words: number[]; originalLengthBits: number } {
  const utf8Bytes: number[] = []
  if (typeof str === 'string') {
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i)
      if (code < 0x80) {
        utf8Bytes.push(code)
      } else if (code < 0x800) {
        utf8Bytes.push(0xc0 | (code >> 6), 0x80 | (code & 0x3f))
      } else {
        utf8Bytes.push(0xe0 | (code >> 12), 0x80 | ((code >> 6) & 0x3f), 0x80 | (code & 0x3f))
      }
    }
  } else {
    utf8Bytes.push(...str)
  }

  const originalLengthBits = utf8Bytes.length * 8

  // 填充 1 个 0x80 (即二进制的 10000000)
  utf8Bytes.push(0x80)

  // 填充 0x00 直到 (字节数 % 64) === 56 (即 448 位)
  while (utf8Bytes.length % 64 !== 56) {
    utf8Bytes.push(0)
  }

  // 转换为 32 位整数数组
  const words: number[] = []
  for (let i = 0; i < utf8Bytes.length; i += 4) {
    const word =
      (utf8Bytes[i] & 0xff) |
      ((utf8Bytes[i + 1] & 0xff) << 8) |
      ((utf8Bytes[i + 2] & 0xff) << 16) |
      ((utf8Bytes[i + 3] & 0xff) << 24)
    words.push(word)
  }

  // 追加 64 位原始长度（低 32 位与高 32 位，小端序）
  words.push(originalLengthBits & 0xffffffff)
  words.push(Math.floor(originalLengthBits / 0x100000000) & 0xffffffff)

  return { words, originalLengthBits }
}

/**
 * 将 32 位整数转换为小端序十六进制字符串
 */
export function wordToHex(value: number): string {
  let hex = ''
  for (let i = 0; i < 4; i++) {
    const byte = (value >>> (i * 8)) & 0xff
    hex += byte.toString(16).padStart(2, '0')
  }
  return hex
}

/**
 * 计算给定字符串的真实 MD5 128 位十六进制摘要
 * @param message 输入文本
 */
export function computeMd5(message: string): string {
  const { words } = stringToLittleEndianWords(message)

  // 4 个初始幻数寄存器
  let a = 0x67452301
  let b = 0xefcdab89
  let c = 0x98badcfe
  let d = 0x10325476

  // 64 个常数 T[i] = floor(2^32 * abs(sin(i + 1)))
  const T: number[] = []
  for (let i = 1; i <= 64; i++) {
    T.push(Math.floor(Math.abs(Math.sin(i)) * 0x100000000) | 0)
  }

  // 移位量表
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ]

  // 按 16 个字 (512 位) 分块处理
  for (let chunk = 0; chunk < words.length; chunk += 16) {
    const AA = a
    const BB = b
    const CC = c
    const DD = d

    for (let i = 0; i < 64; i++) {
      let f = 0
      let g = 0

      if (i < 16) {
        f = F(b, c, d)
        g = i
      } else if (i < 32) {
        f = G(b, c, d)
        g = (5 * i + 1) % 16
      } else if (i < 48) {
        f = H(b, c, d)
        g = (3 * i + 5) % 16
      } else {
        f = I(b, c, d)
        g = (7 * i) % 16
      }

      const temp = d
      d = c
      c = b
      const sum = addUnsigned(addUnsigned(a, f), addUnsigned(T[i], words[chunk + g]))
      b = addUnsigned(b, rotateLeft(sum, S[i]))
      a = temp
    }

    a = addUnsigned(a, AA)
    b = addUnsigned(b, BB)
    c = addUnsigned(c, CC)
    d = addUnsigned(d, DD)
  }

  return wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)
}

/**
 * 将 16 进制字符串转换为 128 位二进制位数组 (0 或 1)
 */
export function hexToBitArray(hex: string): number[] {
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
 * 比较两个 MD5 摘要的雪崩差异位
 */
export function compareAvalanche(
  hashA: string,
  hashB: string
): {
  bitsA: number[]
  bitsB: number[]
  differingCount: number
  totalBits: number
  differingRatio: number
} {
  const bitsA = hexToBitArray(hashA)
  const bitsB = hexToBitArray(hashB)
  const totalBits = Math.max(bitsA.length, bitsB.length)
  let differingCount = 0

  for (let i = 0; i < totalBits; i++) {
    if (bitsA[i] !== bitsB[i]) {
      differingCount++
    }
  }

  return {
    bitsA,
    bitsB,
    differingCount,
    totalBits,
    differingRatio: totalBits > 0 ? (differingCount / totalBits) * 100 : 0,
  }
}
