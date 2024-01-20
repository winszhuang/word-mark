<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import Hint from './components/Hint.vue'
import { nextTick, onMounted, ref, shallowRef, watch } from 'vue'
import { useTooltip } from '../composables/use-tooltip'
import { useWords } from '../composables/use-words.ts'
import { isSentence, isSingleWord } from '../utils/sentence.ts'
import { allLeafNodes, getTextBoundingClientRect } from '../utils/node.ts'
import { UpdateWordsMessage } from '@/types/message'

const { tooltipPosition, showTooltip, currentWord, onSave } = useTooltip()

type HintInfo = {
  left: number
  top: number
  width: number
  text: string
  word: Word
  isShow: boolean
}

const { wordHandler } = useWords()
const hints = ref<HintInfo[]>([])
const words = shallowRef<Record<string, Word>>({})
const allTextNodes = shallowRef(
  allLeafNodes(
    document.body,
    (n) => isSingleWord(n.textContent || '') || isSentence(n.textContent || '')
  )
)

function mountHints(wordMap: Record<string, Word>) {
  console.log('mountHints: ', wordMap)
  hints.value = []
  allTextNodes.value.forEach((node) => {
    Object.entries(wordMap).forEach(([text, word]) => {
      if (node.textContent?.includes(text) && node.parentElement) {
        const { top, left, width } = getTextBoundingClientRect(node, text)
        hints.value.push({ left, top: top + window.scrollY, text: '-', width, isShow: true, word })
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
  allTextNodes.value = allLeafNodes(
    document.body,
    (n) => isSingleWord(n.textContent || '') || isSentence(n.textContent || '')
  )
  nextTick(() => mountHints(w))
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
  <section class="absolute">
    <Hint
      v-for="(hint, index) in hints"
      :key="index"
      :text="hint.text"
      :left="hint.left"
      :top="hint.top"
      :width="hint.width"
      :word="hint.word"
      @hover="(isHover) => console.log(isHover)"
      @remove-word="onRemoveWord"
    />
  </section>
  <section class="absolute"></section>
</template>
