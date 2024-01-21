<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import Hint from './components/Hint.vue'
import { onMounted, ref, shallowRef, watch } from 'vue'
import { useTooltip } from '../composables/use-tooltip'
import { useWords } from '../composables/use-words.ts'
import { allLeafNodes, getTextBoundingClientRects } from '../utils/node.ts'
import { UpdateWordsMessage } from '@/types/message'

const { tooltipPosition, showTooltip, currentWord, onSave } = useTooltip()

type HintInfo = {
  left: number
  top: number
  width: number
  height: number
  word: Word
  isShow: boolean
}

const { wordHandler } = useWords()
const hints = ref<HintInfo[]>([])
const words = shallowRef<Record<string, Word>>({})
const allTextNodes = allLeafNodes(
  document.body,
  (n) => n.textContent?.trim().length !== 0 && n.nodeName !== '#comment'
)

function mountHints(wordMap: Record<string, Word>) {
  hints.value = []
  allTextNodes.forEach((node) => {
    Object.entries(wordMap).forEach(([text, word]) => {
      if (node.textContent?.includes(text) && node.parentElement) {
        const rects = getTextBoundingClientRects(node, text)
        const nodeHints = rects.map((rect) => {
          const { left, top, width, height } = rect
          return {
            left,
            top: top + window.scrollY,
            width,
            height,
            isShow: true,
            word
          }
        })
        hints.value.push(...nodeHints)
      }
    })
  })
}

function onRemoveWord(word: Word) {
  wordHandler.delete(word.text)
}

onMounted(() => {
  wordHandler.getAll().then((w) => {
    words.value = w
  })
})

chrome.runtime.onMessage.addListener((req: UpdateWordsMessage) => {
  words.value = req.data
})

watch(words, (w) => {
  mountHints(w)
})
</script>

<template>
  <Tooltip
    :left="tooltipPosition.left"
    :top="tooltipPosition.top"
    :show="showTooltip"
    :word="currentWord"
    @save="onSave"
  />
  <section class="wds-absolute">
    <Hint
      v-for="(hint, index) in hints"
      :key="index"
      :left="hint.left"
      :top="hint.top"
      :width="hint.width"
      :height="hint.height"
      :word="hint.word"
      @remove-word="onRemoveWord"
    />
  </section>
  <section class="wds-absolute"></section>
</template>
