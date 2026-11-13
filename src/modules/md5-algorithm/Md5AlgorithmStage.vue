<template>
  <div
    ref="stageContainerRef"
    class="relative w-full h-full min-h-[480px] flex items-center justify-center select-none overflow-hidden"
  >
    <!-- 舞台核心画布 (响应镜头变换) -->
    <div
      ref="canvasRef"
      class="relative w-[880px] h-[480px] p-6 rounded-2xl border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xl flex flex-col justify-between"
    >
      <!-- ================= 阶段 1: 消息填充与长度追加 ================= -->
      <div
        class="md5-padding-section w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-slate-800/70 flex flex-col gap-2 transition-opacity"
      >
        <div class="flex items-center justify-between text-xs">
          <span class="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <span class="w-2.5 h-2.5 rounded-full bg-candy-purple"></span>
            512-bit Block Padding Pipeline
          </span>
          <span class="total-512-badge opacity-0 px-2 py-0.5 rounded font-mono text-[10px] bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
            512 bits = 16 words × 32 bits
          </span>
        </div>

        <!-- 比特流可视化排布 -->
        <div class="flex items-center gap-1.5 font-mono text-xs overflow-x-auto py-1">
          <!-- 原始数据 -->
          <div class="bit-original px-2.5 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/40 text-indigo-600 dark:text-indigo-400 flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans font-semibold">Message M</span>
            <span class="font-bold">40 bits ("Candy")</span>
          </div>

          <span class="text-slate-400 font-bold">+</span>

          <!-- 填充 1 -->
          <div class="bit-one px-2 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/50 text-rose-600 dark:text-rose-400 font-bold flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans">Single '1'</span>
            <span>0b1 (1 bit)</span>
          </div>

          <span class="text-slate-400 font-bold">+</span>

          <!-- 填充 0 至 448 位 -->
          <div class="bit-zeros px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/40 text-cyan-600 dark:text-cyan-400 flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans font-semibold">Zeroes Padding</span>
            <span class="font-bold">0b000... (407 bits) -> 448 bits</span>
          </div>

          <span class="text-slate-400 font-bold">+</span>

          <!-- 原始长度 64 位 -->
          <div class="bit-length px-2.5 py-1.5 rounded-lg bg-amber-500/15 border border-amber-500/50 text-amber-600 dark:text-amber-400 font-bold flex flex-col items-center">
            <span class="text-[9px] uppercase tracking-wider font-sans">Length (64b)</span>
            <span>40 (0x280000...)</span>
          </div>
        </div>
      </div>

      <!-- ================= 阶段 2: 4 个 32-bit 幻数缓冲区 ================= -->
      <div
        class="md5-registers-section w-full grid grid-cols-4 gap-3 transition-opacity"
      >
        <!-- 寄存器 A -->
        <div class="reg-card p-3 rounded-xl border border-purple-500/40 bg-purple-50/50 dark:bg-purple-950/30 flex flex-col items-center gap-1 shadow-md">
          <div class="flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400">
            <span>Register</span>
            <span class="px-1.5 py-0.5 rounded bg-purple-500 text-white text-[10px]">A</span>
          </div>
          <span class="reg-val-a font-mono text-xs font-bold text-slate-800 dark:text-slate-100">0x67452301</span>
          <span class="text-[9px] text-slate-400 font-mono">Word 0 (32-bit)</span>
        </div>

        <!-- 寄存器 B -->
        <div class="reg-card p-3 rounded-xl border border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/30 flex flex-col items-center gap-1 shadow-md">
          <div class="flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400">
            <span>Register</span>
            <span class="px-1.5 py-0.5 rounded bg-cyan-500 text-white text-[10px]">B</span>
          </div>
          <span class="reg-val-b font-mono text-xs font-bold text-slate-800 dark:text-slate-100">0xEFCDAB89</span>
          <span class="text-[9px] text-slate-400 font-mono">Word 1 (32-bit)</span>
        </div>

        <!-- 寄存器 C -->
        <div class="reg-card p-3 rounded-xl border border-emerald-500/40 bg-emerald-50/50 dark:bg-emerald-950/30 flex flex-col items-center gap-1 shadow-md">
          <div class="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
            <span>Register</span>
            <span class="px-1.5 py-0.5 rounded bg-emerald-500 text-white text-[10px]">C</span>
          </div>
          <span class="reg-val-c font-mono text-xs font-bold text-slate-800 dark:text-slate-100">0x98BADCFE</span>
          <span class="text-[9px] text-slate-400 font-mono">Word 2 (32-bit)</span>
        </div>

        <!-- 寄存器 D -->
        <div class="reg-card p-3 rounded-xl border border-rose-500/40 bg-rose-50/50 dark:bg-rose-950/30 flex flex-col items-center gap-1 shadow-md">
          <div class="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400">
            <span>Register</span>
            <span class="px-1.5 py-0.5 rounded bg-rose-500 text-white text-[10px]">D</span>
          </div>
          <span class="reg-val-d font-mono text-xs font-bold text-slate-800 dark:text-slate-100">0x10325476</span>
          <span class="text-[9px] text-slate-400 font-mono">Word 3 (32-bit)</span>
        </div>
      </div>

      <!-- ================= 阶段 3: 4 轮 64 步主循环演算 ================= -->
      <div
        class="md5-round-section w-full p-3 rounded-xl border border-indigo-500/30 bg-indigo-50/30 dark:bg-indigo-950/20 flex items-center justify-between transition-opacity"
      >
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="active-func-badge px-2.5 py-1 rounded-md bg-indigo-600 text-white text-xs font-mono font-bold shadow-md">
              Round 1: F(B,C,D) = (B ∧ C) ∨ (¬B ∧ D)
            </span>
            <span class="round-step-counter text-xs font-mono font-semibold text-indigo-700 dark:text-indigo-300">
              Step: 01 / 64
            </span>
          </div>
          <div class="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Core Transform: B + ((A + Func(B,C,D) + M[k] + T[i]) &lt;&lt;&lt; s)
          </div>
        </div>

        <!-- 算法流程微图 -->
        <div class="flex items-center gap-1.5 text-[10px] font-mono text-slate-600 dark:text-slate-300">
          <span class="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">A</span>
          <span>→</span>
          <span class="px-1.5 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 font-bold">Func</span>
          <span>→</span>
          <span class="px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-700 dark:text-amber-300">T[i]</span>
          <span>→</span>
          <span class="px-1.5 py-0.5 rounded bg-rose-200 dark:bg-rose-900 text-rose-700 dark:text-rose-300">&lt;&lt;&lt; s</span>
          <span>→</span>
          <span class="px-1.5 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-bold">new B</span>
        </div>
      </div>

      <!-- ================= 阶段 4: 级联拼接 128 位十六进制摘要 ================= -->
      <div
        class="md5-cascade-section w-full flex flex-col items-center gap-2 transition-opacity"
      >
        <div
          class="final-digest-box w-full p-3 rounded-xl border-2 border-candy-purple/60 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-pink-500/10 backdrop-blur-md shadow-xl flex items-center justify-between"
        >
          <div class="flex items-center gap-2">
            <span class="text-xl">✨</span>
            <div class="flex flex-col">
              <span class="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                128-Bit MD5 Output Digest (32 Hex Chars)
              </span>
              <span class="font-mono text-sm md:text-base font-extrabold text-slate-800 dark:text-white tracking-widest selection:bg-purple-500">
                2a98f10b4b78c91d6e5428af99dc103b
              </span>
            </div>
          </div>
          <el-button
            type="primary"
            size="small"
            class="!rounded-lg"
            @click="showLabDialog = true"
          >
            {{ t('modules.md5.interactive.labTitle') }}
          </el-button>
        </div>
      </div>
    </div>

    <!-- 交互式雪崩效应实时对比抽屉 / 弹窗 -->
    <el-dialog
      v-model="showLabDialog"
      :title="t('modules.md5.interactive.labTitle')"
      width="90%"
      class="max-w-2xl !rounded-2xl"
    >
      <div class="space-y-4">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          {{ t('modules.md5.interactive.flipHint') }}
        </p>

        <!-- 输入对比区域 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.md5.interactive.inputA') }}
            </label>
            <el-input v-model="textA" placeholder="Input A" @input="updateHashes" />
            <div class="font-mono text-[11px] p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 break-all select-all">
              {{ hashA }}
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-semibold text-slate-700 dark:text-slate-300">
              {{ t('modules.md5.interactive.inputB') }}
            </label>
            <el-input v-model="textB" placeholder="Input B" @input="updateHashes" />
            <div class="font-mono text-[11px] p-2 rounded bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 break-all select-all">
              {{ hashB }}
            </div>
          </div>
        </div>

        <!-- 统计指标与进度条 -->
        <div class="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <div>
            <div class="text-xs text-slate-500 dark:text-slate-400">{{ t('modules.md5.interactive.diffBits') }}</div>
            <div class="text-lg font-bold font-mono text-purple-600 dark:text-purple-400">
              {{ avalancheResult.differingCount }} / 128
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-slate-500 dark:text-slate-400">{{ t('modules.md5.interactive.diffRatio') }}</div>
            <div class="text-lg font-bold font-mono text-rose-500 dark:text-rose-400">
              {{ avalancheResult.differingRatio.toFixed(1) }}%
            </div>
          </div>
        </div>

        <!-- 128 个二进制比特对比网格可视化 (绿色相同，红色翻转) -->
        <div class="space-y-1">
          <div class="text-[11px] font-semibold text-slate-500">128-Bit Avalanche Diff Matrix (Red = Flipped Bit)</div>
          <div class="grid grid-cols-16 gap-1 p-2 rounded-lg bg-slate-900 border border-slate-700">
            <div
              v-for="(bitA, index) in avalancheResult.bitsA"
              :key="index"
              class="w-full aspect-square rounded-[2px] transition-colors"
              :class="bitA === avalancheResult.bitsB[index] ? 'bg-emerald-500/80' : 'bg-rose-500 animate-pulse'"
              :title="`Bit ${index}: A=${bitA} vs B=${avalancheResult.bitsB[index]}`"
            ></div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { useI18n } from 'vue-i18n'
import type { useCamera } from '@/composables/useCamera'
import { computeMd5, compareAvalanche } from '@/utils/md5'
import { createMd5Timeline } from './timeline'

const { t } = useI18n()

const stageContainerRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLElement | null>(null)

// 交互实验室状态
const showLabDialog = ref<boolean>(false)
const textA = ref<string>('Candy')
const textB = ref<string>('candy')
const hashA = ref<string>(computeMd5('Candy'))
const hashB = ref<string>(computeMd5('candy'))
const avalancheResult = ref(compareAvalanche(hashA.value, hashB.value))

function updateHashes(): void {
  hashA.value = computeMd5(textA.value)
  hashB.value = computeMd5(textB.value)
  avalancheResult.value = compareAvalanche(hashA.value, hashB.value)
}

let activeTimeline: gsap.core.Timeline | null = null

/**
 * 初始化并挂载动画时间轴
 */
function initAnimation(camera: ReturnType<typeof useCamera>, onStepChange?: (step: number) => void): gsap.core.Timeline | null {
  if (!stageContainerRef.value) return null
  activeTimeline = createMd5Timeline(stageContainerRef.value, camera, {
    onStepChange,
  })
  return activeTimeline
}

defineExpose({
  initAnimation,
  getCanvasRef: () => canvasRef.value,
})
</script>

<style scoped>
/* 16 列比对网格 */
.grid-cols-16 {
  grid-template-columns: repeat(16, minmax(0, 1fr));
}
</style>
