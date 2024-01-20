<script setup lang="ts">
import Tooltip from './components/Tooltip.vue'
import Hint from './components/Hint.vue'
import { ref, shallowRef } from 'vue'
import { useTooltip } from '../composables/use-tooltip'
import { useWords } from '../composables/use-words.ts'
import { isSentence, isSingleWord } from '../utils/sentence.ts'
import { allLeafNodes, getTextBoundingClientRect } from '../utils/node.ts'

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
const allTextNodes = shallowRef(
  allLeafNodes(
    document.body,
    (n) => isSingleWord(n.textContent || '') || isSentence(n.textContent || '')
  )
)

async function mountHints() {
  const words = await wordHandler.getAll()
  allTextNodes.value.forEach((node) => {
    Object.entries(words).forEach(([text, word]) => {
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

chrome.runtime.onMessage.addListener((req) => {
  console.log(req)
})

mountHints()
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
