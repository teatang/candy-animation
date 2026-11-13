<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden"
  >
    <!-- 舞台核心画布 (响应镜头变换) -->
    <div
      ref="canvasRef"
      class="relative w-[900px] h-[480px] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl flex items-center justify-between"
    >
      <!-- 物理介质通信导轨 SVG -->
      <svg class="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 900 480">
        <defs>
          <linearGradient id="tcpipGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.8" />
            <stop offset="50%" stop-color="#06b6d4" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#10b981" stop-opacity="0.8" />
          </linearGradient>
          <filter id="tcpipGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- 底层电缆 -->
        <path
          d="M 230 240 L 670 240"
          stroke="currentColor"
          class="text-slate-300 dark:text-slate-700"
          stroke-width="4"
          stroke-linecap="round"
        />

        <!-- 点亮的数据链路物理比特流通道 -->
        <path
          d="M 230 240 L 670 240"
          stroke="url(#tcpipGrad)"
          stroke-width="6"
          stroke-linecap="round"
          filter="url(#tcpipGlow)"
          class="tcpip-physical-wire"
        />
      </svg>

      <!-- 发送端 Host A (客户端协议栈) -->
      <div
        class="host-a-stack relative z-10 w-[230px] p-3.5 rounded-xl border border-blue-500/30 bg-slate-50/90 dark:bg-slate-800/90 shadow-lg flex flex-col gap-2.5 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
            <span class="font-bold text-xs tracking-wider text-blue-600 dark:text-blue-400">HOST A (Sender)</span>
          </div>
          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
            IP: 192.168.1.100
          </span>
        </div>

        <!-- 4 层封装状态示意 -->
        <div class="space-y-1.5 text-[11px] font-mono">
          <!-- 4. 应用层 -->
          <div class="packet-app-payload p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-between">
            <span class="font-sans font-bold text-[10px]">L4: Application</span>
            <span class="font-bold">HTTP "GET /"</span>
          </div>

          <!-- 3. 传输层 TCP Header 封装 -->
          <div class="header-tcp-block tcp-segment-glow p-2 rounded-lg bg-blue-500/15 border border-blue-500/50 text-blue-700 dark:text-blue-300 flex items-center justify-between">
            <span class="font-sans font-bold text-[10px]">+ TCP Header</span>
            <span>Port: 54321→80</span>
          </div>

          <!-- 2. 网络层 IP Header 封装 -->
          <div class="header-ip-block ip-packet-glow p-2 rounded-lg bg-cyan-500/15 border border-cyan-500/50 text-cyan-700 dark:text-cyan-300 flex items-center justify-between">
            <span class="font-sans font-bold text-[10px]">+ IP Header</span>
            <span>TTL: 64 | TCP</span>
          </div>

          <!-- 1. 数据链路层 Ethernet Header 封装 -->
          <div class="header-eth-block p-2 rounded-lg bg-emerald-500/15 border border-emerald-500/50 text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
            <span class="font-sans font-bold text-[10px]">+ Ethernet MAC</span>
            <span>0x0800 IPv4</span>
          </div>
        </div>
      </div>

      <!-- 中央传输区：多层嵌套飞行帧 (Russian Doll Packet) -->
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <!-- 飞行中的以太网帧结构 -->
        <div
          class="tcpip-traveling-frame absolute p-2.5 rounded-xl border-2 border-blue-500/80 bg-slate-900/95 text-white shadow-2xl flex items-center gap-1 font-mono text-xs scale-90"
        >
          <div class="px-2 py-1 rounded bg-emerald-600/80 text-[10px]">
            <div class="text-[8px] opacity-75">MAC Header</div>
            <div>14 Bytes</div>
          </div>
          <div class="px-2 py-1 rounded bg-cyan-600/80 text-[10px]">
            <div class="text-[8px] opacity-75">IP Header</div>
            <div>20 Bytes</div>
          </div>
          <div class="px-2 py-1 rounded bg-blue-600/80 text-[10px]">
            <div class="text-[8px] opacity-75">TCP Header</div>
            <div>20 Bytes</div>
          </div>
          <div class="px-2 py-1 rounded bg-indigo-600 text-[10px] font-bold">
            <div class="text-[8px] opacity-75">Payload</div>
            <div>"GET /"</div>
          </div>
          <div class="trailer-fcs-block px-1.5 py-1 rounded bg-amber-600/80 text-[10px]">
            <div class="text-[8px] opacity-75">FCS</div>
            <div>4B</div>
          </div>
        </div>

        <!-- 阶段 4: 接收端逐层剥除报头交付弹框 -->
        <div
          class="tcpip-decapsulation-box absolute w-[400px] p-4 rounded-xl border-2 border-blue-500/60 bg-slate-900/95 text-white shadow-2xl backdrop-blur-md flex flex-col gap-2 pointer-events-auto"
        >
          <div class="flex items-center justify-between border-b border-slate-700 pb-1.5">
            <span class="text-xs font-bold text-blue-400 flex items-center gap-1">
              <span>📦</span> Layer-by-Layer Decapsulation
            </span>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300">
              Host B Kernel
            </span>
          </div>

          <div class="space-y-1.5 font-mono text-xs">
            <div class="peel-eth flex items-center justify-between p-1.5 rounded bg-slate-800 text-slate-300">
              <span>1. Strip Ethernet Header:</span>
              <span class="text-emerald-400 font-bold">✓ MAC Verified</span>
            </div>
            <div class="peel-ip flex items-center justify-between p-1.5 rounded bg-slate-800 text-slate-300">
              <span>2. Strip IP Header:</span>
              <span class="text-cyan-400 font-bold">✓ IP Matched</span>
            </div>
            <div class="peel-tcp flex items-center justify-between p-1.5 rounded bg-slate-800 text-slate-300">
              <span>3. Strip TCP Header:</span>
              <span class="text-blue-400 font-bold">✓ Port 80 Delivered</span>
            </div>
          </div>

          <div
            class="delivery-success-badge opacity-0 p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-1.5"
          >
            <span>🎉</span>
            <span>Delivered to Web Server Application (HTTP 200 OK)</span>
          </div>
        </div>
      </div>

      <!-- 接收端 Host B (服务端协议栈) -->
      <div
        class="host-b-stack relative z-10 w-[230px] p-3.5 rounded-xl border border-emerald-500/30 bg-slate-50/90 dark:bg-slate-800/90 shadow-lg flex flex-col gap-2.5 transition-colors"
      >
        <div class="flex items-center justify-between border-b border-slate-200 dark:border-slate-700/80 pb-2">
          <div class="flex items-center gap-1.5">
            <span class="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="font-bold text-xs tracking-wider text-emerald-600 dark:text-emerald-400">HOST B (Receiver)</span>
          </div>
          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
            IP: 93.184.216.34
          </span>
        </div>

        <div class="space-y-2 text-xs p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/60 dark:bg-slate-900/60">
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Listening:</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400 font-bold">0.0.0.0:80 (HTTP)</span>
          </div>
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Process:</span>
            <span class="font-mono text-blue-600 dark:text-blue-400">nginx/worker (pid 1024)</span>
          </div>
          <div class="text-[10px] text-slate-500 font-semibold flex items-center justify-between">
            <span>Checksum:</span>
            <span class="font-mono text-emerald-600 dark:text-emerald-400">FCS CRC32 PASS</span>
          </div>
        </div>

        <div class="text-[10px] p-2 rounded-lg border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300">
          <div class="font-mono">MAC: 52:54:00:12:34:56</div>
          <div class="text-[9px] opacity-75">Destination Web Host</div>
        </div>
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
        @click="showInspectorDialog = true"
      >
        🔍 {{ t('modules.tcpip.interactive.inspectorTitle') }}
      </el-button>
    </div>

    <!-- 交互式分层报文深度拆解弹窗 -->
    <el-dialog
      v-model="showInspectorDialog"
      :title="t('modules.tcpip.interactive.inspectorTitle')"
      width="90%"
      class="max-w-2xl !rounded-2xl"
    >
      <div class="space-y-4 font-sans">
        <!-- 载荷与端口配置 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              HTTP Payload 载荷
            </label>
            <el-input v-model="customPayload" placeholder="GET /index.html HTTP/1.1" />
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {{ t('modules.tcpip.interactive.srcPort') }}
              </label>
              <el-input v-model="srcPort" />
            </div>
            <div class="space-y-1">
              <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {{ t('modules.tcpip.interactive.dstPort') }}
              </label>
              <el-input v-model="dstPort" />
            </div>
          </div>
        </div>

        <!-- 4 层报头与长度统计计算 -->
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 space-y-2 text-xs font-mono">
          <div class="flex items-center justify-between text-indigo-600 dark:text-indigo-400">
            <span>{{ t('modules.tcpip.interactive.layerApp') }}:</span>
            <span class="font-bold">{{ payloadBytes }} Bytes</span>
          </div>

          <div class="flex items-center justify-between text-blue-600 dark:text-blue-400">
            <span>{{ t('modules.tcpip.interactive.layerTcp') }}:</span>
            <span class="font-bold">+ 20 Bytes Header</span>
          </div>

          <div class="flex items-center justify-between text-cyan-600 dark:text-cyan-400">
            <span>{{ t('modules.tcpip.interactive.layerIp') }}:</span>
            <span class="font-bold">+ 20 Bytes Header</span>
          </div>

          <div class="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
            <span>{{ t('modules.tcpip.interactive.layerEth') }}:</span>
            <span class="font-bold">+ 14B MAC + 4B FCS</span>
          </div>

          <div class="border-t border-slate-200 dark:border-slate-700 pt-2 flex items-center justify-between font-bold text-slate-800 dark:text-white">
            <span class="font-sans">{{ t('modules.tcpip.interactive.totalSize') }}:</span>
            <span class="text-sm text-purple-600 dark:text-purple-400">{{ totalFrameBytes }} Bytes</span>
          </div>

          <div class="flex items-center justify-between text-slate-500 font-sans text-[11px]">
            <span>{{ t('modules.tcpip.interactive.overheadRatio') }}:</span>
            <span class="font-bold">{{ overheadRatio }}%</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { useCamera } from '@/composables/useCamera'
import { createTcpIpTimeline } from './timeline'

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)

// 交互式报文分析器数据
const showInspectorDialog = ref<boolean>(false)
const customPayload = ref<string>('GET /index.html HTTP/1.1')
const srcPort = ref<string>('54321')
const dstPort = ref<string>('80')

const payloadBytes = computed(() => new TextEncoder().encode(customPayload.value).length)
const totalFrameBytes = computed(() => payloadBytes.value + 20 + 20 + 14 + 4)
const overheadRatio = computed(() => {
  const headers = 20 + 20 + 14 + 4
  return ((headers / totalFrameBytes.value) * 100).toFixed(1)
})

let activeTimeline: gsap.core.Timeline | null = null

/**
 * 初始化并挂载动画时间轴
 */
function initAnimation(camera: ReturnType<typeof useCamera>, onStepChange?: (step: number) => void): gsap.core.Timeline | null {
  if (!stageContainerRef.value) return null
  activeTimeline = createTcpIpTimeline(stageContainerRef.value, camera, {
    onStepChange,
  })
  return activeTimeline
}

defineExpose({
  initAnimation,
  getCanvasRef: () => canvasRef.value,
})
</script>
