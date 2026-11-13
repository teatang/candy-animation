<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden"
  >
    <!-- 舞台核心画布 (响应镜头变换) -->
    <div
      ref="canvasRef"
      class="relative w-[880px] h-[480px] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl flex items-center justify-between"
    >
      <!-- 通信通道 SVG 导轨 -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 880 480">
        <defs>
          <linearGradient id="wsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#10b981" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#8b5cf6" stop-opacity="0.8" />
          </linearGradient>
          <filter id="wsGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- 基础物理链路 -->
        <path
          d="M 210 240 L 670 240"
          stroke="currentColor"
          class="text-slate-300 dark:text-slate-700"
          stroke-width="4"
          stroke-linecap="round"
        />

        <!-- WebSocket 升级就绪后的全双工高速管道 -->
        <path
          d="M 210 240 L 670 240"
          stroke="url(#wsGrad)"
          stroke-width="6"
          stroke-linecap="round"
          filter="url(#wsGlow)"
          class="ws-socket-pipe"
        />
      </svg>

      <!-- 客户端终端节点 -->
      <div
        class="relative z-10 w-[210px] p-4 rounded-xl border border-emerald-500/30 bg-slate-50/90 dark:bg-slate-800/90 shadow-lg flex flex-col gap-3 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-bold text-xs tracking-wider text-emerald-600 dark:text-emerald-400">CLIENT</span>
          </div>
          <span class="ws-client-status font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            CONNECTING
          </span>
        </div>

        <div class="space-y-2 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Upgrade:</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">websocket</span>
          </div>
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Masking:</span>
            <span class="font-mono text-cyan-600 dark:text-cyan-400 font-bold">XOR 32-bit (ON)</span>
          </div>
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Socket:</span>
            <span class="font-mono text-purple-600 dark:text-purple-400">ws.readyState = 1</span>
          </div>
        </div>

        <div class="text-[10px] p-2 rounded-lg border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
          <div class="font-mono">URL: ws://candy.dev/live</div>
          <div class="text-[9px] opacity-75">Full-Duplex Mode</div>
        </div>
      </div>

      <!-- 中央区域：动画报文与帧结构微观展示 -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <!-- 阶段 1: HTTP Upgrade Request -->
        <div class="packet-upgrade-req absolute px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white text-xs font-mono font-bold shadow-xl flex flex-col items-center">
          <div class="flex items-center gap-1">
            <span>🚀</span>
            <span>GET /live (Upgrade: websocket)</span>
          </div>
          <span class="text-[9px] opacity-90">Sec-WebSocket-Key: dGhlIHNhbXBsZQ==</span>
        </div>

        <!-- 阶段 1: HTTP 101 Response -->
        <div class="packet-upgrade-resp absolute px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-xs font-mono font-bold shadow-xl flex flex-col items-center">
          <div class="flex items-center gap-1">
            <span>✨</span>
            <span>101 Switching Protocols</span>
          </div>
          <span class="text-[9px] opacity-90">Sec-WebSocket-Accept: s3pPLMBiTxaQ==</span>
        </div>

        <!-- 阶段 2: 数据帧二进制微观解构卡片 -->
        <div
          class="ws-frame-inspection-box absolute w-[420px] p-4 rounded-xl border-2 border-emerald-500/60 bg-slate-900/95 text-white shadow-2xl backdrop-blur-md flex flex-col gap-2.5 pointer-events-auto"
        >
          <div class="flex items-center justify-between border-b border-slate-700 pb-1.5">
            <span class="text-xs font-bold text-emerald-400 flex items-center gap-1">
              <span>🔬</span> RFC 6455 Binary Frame Structure
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40">
              Opcode: 0x1 (Text)
            </span>
          </div>

          <!-- 帧字段排布网格 -->
          <div class="grid grid-cols-4 gap-2 text-center text-xs font-mono">
            <div class="frame-field p-1.5 rounded bg-slate-800 border border-slate-700">
              <div class="text-[9px] text-slate-400">FIN</div>
              <div class="font-bold text-emerald-400">1 (Final)</div>
            </div>
            <div class="frame-field p-1.5 rounded bg-slate-800 border border-slate-700">
              <div class="text-[9px] text-slate-400">Opcode</div>
              <div class="font-bold text-cyan-400">0x1 (Text)</div>
            </div>
            <div class="frame-field p-1.5 rounded bg-slate-800 border border-slate-700">
              <div class="text-[9px] text-slate-400">MASK</div>
              <div class="font-bold text-rose-400">1 (Client)</div>
            </div>
            <div class="frame-field p-1.5 rounded bg-slate-800 border border-slate-700">
              <div class="text-[9px] text-slate-400">Payload Len</div>
              <div class="font-bold text-amber-400">5 bytes</div>
            </div>
          </div>

          <!-- 掩码 XOR 变换展示 -->
          <div class="mask-xor-glow p-2 rounded-lg bg-slate-800/80 border border-emerald-500/30 text-[11px] font-mono space-y-1">
            <div class="flex items-center justify-between text-slate-300">
              <span>Mask-Key:</span>
              <span class="text-rose-400 font-bold">0x4A 0x8F 0xC2 0x91</span>
            </div>
            <div class="flex items-center justify-between text-slate-300">
              <span>Raw Payload:</span>
              <span class="text-cyan-400">"Candy" (43 61 6E 64 79)</span>
            </div>
            <div class="flex items-center justify-between text-emerald-300 font-bold pt-1 border-t border-slate-700/60">
              <span>Masked (XOR):</span>
              <span class="text-emerald-400">0x09 0xEE 0xAC 0xF5 0x33</span>
            </div>
          </div>
        </div>

        <!-- 阶段 3: 全双工双向流动 -->
        <div class="ws-full-duplex-lane absolute flex flex-col gap-6 items-center pointer-events-none">
          <!-- 客户端发出的业务消息 -->
          <div class="packet-client-msg px-3 py-1.5 rounded-full bg-emerald-500 text-white text-xs font-mono font-bold shadow-lg shadow-emerald-500/40 flex items-center gap-1.5">
            <span>💬</span>
            <span>SEND: "Hello WebSocket!"</span>
          </div>

          <!-- 心跳探测 Ping / Pong -->
          <div class="flex items-center gap-4">
            <div class="packet-ping px-3 py-1 rounded-full bg-amber-500 text-white text-[11px] font-mono font-bold shadow-md">
              💓 PING (0x9)
            </div>
            <div class="packet-pong px-3 py-1 rounded-full bg-cyan-500 text-white text-[11px] font-mono font-bold shadow-md">
              ⚡ PONG (0xA) RTT: 1ms
            </div>
          </div>

          <!-- 服务端实时并发推送 -->
          <div class="packet-server-push px-3 py-1.5 rounded-full bg-purple-500 text-white text-xs font-mono font-bold shadow-lg shadow-purple-500/40 flex items-center gap-1.5">
            <span>📈</span>
            <span>PUSH: Stock Tick +3.25%</span>
          </div>
        </div>

        <!-- 阶段 4: 优雅关闭握手卡片 -->
        <div
          class="ws-close-handshake-box absolute px-4 py-2.5 rounded-xl border border-rose-500 bg-rose-600/90 text-white text-xs font-bold shadow-2xl flex items-center gap-3 z-30"
        >
          <span class="text-xl">🛑</span>
          <div>
            <div>Close Handshake: Opcode 0x8 (Code: 1000 Normal Closure)</div>
            <div class="text-[10px] opacity-90 font-mono">TCP Socket Connection Released Cleanly</div>
          </div>
        </div>
      </div>

      <!-- 服务端终端节点 -->
      <div
        class="relative z-10 w-[210px] p-4 rounded-xl border border-purple-500/30 bg-slate-50/90 dark:bg-slate-800/90 shadow-lg flex flex-col gap-3 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></span>
            <span class="font-bold text-xs tracking-wider text-purple-600 dark:text-purple-400">SERVER</span>
          </div>
          <span class="ws-server-status font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300">
            LISTEN
          </span>
        </div>

        <div class="space-y-2 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>RFC GUID:</span>
            <span class="font-mono text-purple-600 dark:text-purple-300 text-[9px]">258EAFA5...</span>
          </div>
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Accept Hash:</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 text-[9px]">SHA1(Key+GUID)</span>
          </div>
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Unmasking:</span>
            <span class="font-mono text-cyan-600 dark:text-cyan-400">Auto Recover</span>
          </div>
        </div>

        <div class="text-[10px] p-2 rounded-lg border border-purple-500/20 bg-purple-50/50 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300">
          <div class="font-mono">Host: ws.candy.dev:443</div>
          <div class="text-[9px] opacity-75">WebSocket Server Engine</div>
        </div>
      </div>

      <!-- 顶部中央协议状态指示胶囊 -->
      <div
        class="ws-channel-badge absolute top-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 text-[11px] font-mono font-bold text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur"
      >
        PROTOCOL: HTTP/1.1 (Pre-Upgrade)
      </div>
    </div>

    <!-- 交互模拟器浮动悬浮工具条 -->
    <div
      class="absolute bottom-3 right-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur"
    >
      <el-button
        type="primary"
        size="small"
        class="!rounded-lg"
        @click="showLabDialog = true"
      >
        🧪 {{ t('modules.websocket.interactive.labTitle') }}
      </el-button>
    </div>

    <!-- 交互式掩码与帧编解码实验室弹窗 -->
    <el-dialog
      v-model="showLabDialog"
      :title="t('modules.websocket.interactive.labTitle')"
      width="90%"
      class="max-w-2xl !rounded-2xl"
    >
      <div class="space-y-4">
        <!-- 消息输入与随机掩码生成 -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.websocket.interactive.inputMsg') }}
            </label>
            <el-button size="small" text type="primary" @click="refreshMask">
              🔄 重新生成 32-bit 随机掩码
            </el-button>
          </div>
          <el-input v-model="inputMsg" placeholder="输入要发送的 WebSocket 文本" @input="updateMasking" />
        </div>

        <!-- 掩码与载荷详细比对表格 -->
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-2.5 font-mono text-xs">
          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-sans">{{ t('modules.websocket.interactive.maskKey') }}:</span>
            <span class="px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 font-bold">
              {{ maskedResult.keyHex }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-slate-500 font-sans">{{ t('modules.websocket.interactive.maskedBytes') }}:</span>
            <span class="text-emerald-600 dark:text-emerald-400 font-bold break-all">
              {{ maskedResult.maskedHex }}
            </span>
          </div>

          <div class="flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-2">
            <span class="text-slate-500 font-sans">{{ t('modules.websocket.interactive.unmaskedBytes') }}:</span>
            <span class="text-cyan-600 dark:text-cyan-400 font-bold">
              "{{ unmaskedText }}"
            </span>
          </div>
        </div>

        <!-- 心跳探测演示 -->
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between">
          <div class="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
            {{ pingSuccess ? t('modules.websocket.interactive.pingPongSuccess') : t('modules.websocket.interactive.statusConnected') }}
          </div>
          <el-button type="success" size="small" @click="simulatePing">
            {{ t('modules.websocket.interactive.triggerPing') }}
          </el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { useCamera } from '@/composables/useCamera'
import { generateMaskKey, maskPayload, unmaskPayload } from '@/utils/websocket'
import { createWebsocketTimeline } from './timeline'

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)

// 交互实验室数据
const showLabDialog = ref<boolean>(false)
const inputMsg = ref<string>('Hello WebSocket!')
const currentMaskKey = ref<number[]>(generateMaskKey())
const maskedResult = ref(maskPayload(inputMsg.value, currentMaskKey.value))
const unmaskedText = ref<string>(unmaskPayload(maskedResult.value.maskedBytes, currentMaskKey.value))
const pingSuccess = ref<boolean>(false)

function updateMasking(): void {
  maskedResult.value = maskPayload(inputMsg.value, currentMaskKey.value)
  unmaskedText.value = unmaskPayload(maskedResult.value.maskedBytes, currentMaskKey.value)
}

function refreshMask(): void {
  currentMaskKey.value = generateMaskKey()
  updateMasking()
}

function simulatePing(): void {
  pingSuccess.value = true
  setTimeout(() => {
    pingSuccess.value = false
  }, 3000)
}

let activeTimeline: gsap.core.Timeline | null = null

/**
 * 初始化并挂载动画时间轴
 */
function initAnimation(camera: ReturnType<typeof useCamera>, onStepChange?: (step: number) => void): gsap.core.Timeline | null {
  if (!stageContainerRef.value) return null
  activeTimeline = createWebsocketTimeline(stageContainerRef.value, camera, {
    onStepChange,
  })
  return activeTimeline
}

defineExpose({
  initAnimation,
  getCanvasRef: () => canvasRef.value,
})
</script>
