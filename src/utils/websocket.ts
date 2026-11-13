/**
 * WebSocket 数据帧与 RFC 6455 掩码工具库
 */

/**
 * 生成 4 字节 (32-bit) 随机掩码
 */
export function generateMaskKey(): number[] {
  return [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ]
}

/**
 * 将字节数组转换为十六进制字符串 (带空格分隔)
 */
export function bytesToHex(bytes: number[]): string {
  return bytes.map((b) => b.toString(16).padStart(2, '0').toUpperCase()).join(' ')
}

/**
 * 对明文字符串进行 RFC 6455 掩码 XOR 变换
 * 公式: M[i] = P[i] XOR K[i % 4]
 * @param text 明文消息
 * @param maskKey 4 字节掩码数组
 */
export function maskPayload(
  text: string,
  maskKey: number[]
): {
  rawBytes: number[]
  maskedBytes: number[]
  keyHex: string
  maskedHex: string
} {
  const encoder = new TextEncoder()
  const rawBytes = Array.from(encoder.encode(text))
  const maskedBytes = rawBytes.map((byte, i) => byte ^ maskKey[i % 4])

  return {
    rawBytes,
    maskedBytes,
    keyHex: bytesToHex(maskKey),
    maskedHex: bytesToHex(maskedBytes),
  }
}

/**
 * 服务端对接收到的掩码数据进行 XOR 还原
 * 公式: P[i] = M[i] XOR K[i % 4]
 * @param maskedBytes 掩码字节数组
 * @param maskKey 4 字节掩码数组
 */
export function unmaskPayload(maskedBytes: number[], maskKey: number[]): string {
  const unmaskedBytes = maskedBytes.map((byte, i) => byte ^ maskKey[i % 4])
  const decoder = new TextDecoder()
  return decoder.decode(new Uint8Array(unmaskedBytes))
}
