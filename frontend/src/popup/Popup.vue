<script setup lang="ts">
import { useChromeMessage } from '../../src/composables/use-chrome-message'
import WButton from '../../src/components/WButton.vue'
import { onMounted, shallowRef } from 'vue'
import { useWords } from '../../src/composables/use-words'
import { RenderWordsMessage, AlertMessage } from '../types/message'
import { Event, EventSource } from '../enums/event.enum'
import { sendMessageToActiveTab } from '../utils/chrome'

const { onWordsUpdate } = useChromeMessage()
const words = shallowRef<Record<string, Word>>({})
const wordStore = useWords()
onWordsUpdate.subscribe((res) => {
  words.value = res.data
})

onMounted(() => {
  wordStore.getAll().then((w) => {
    words.value = w
  })
})

function reRender() {
  sendMessageToActiveTab<RenderWordsMessage>({
    event: Event.RENDER_WORDS,
    from: EventSource.POPUP,
    data: true
  })
}

async function onRemoveWord(word: Word) {
  const isSuccess = await wordStore.delete(word.text)
  sendMessageToActiveTab<AlertMessage>({
    event: Event.ALERT,
    from: EventSource.POPUP,
    data: {
      title: '刪除單字',
      text: isSuccess ? '刪除成功' : '刪除失敗',
      icon: isSuccess ? 'success' : 'error',
      confirmButtonText: '確認'
    }
  })
}
</script>

<template>
  <div class="wds-p-4 wds-w-72 wds-flex wds-flex-col wds-gap-2">
    <header class="wds-text-xl wds-text-center">
      <h1>Word Mark</h1>
    </header>
    <div class="wds-flex wds-gap-2">
      <WButton text="當前網頁" class="wds-block wds-w-[60%]" />
      <WButton text="啟用" />
      <WButton text="停用" />
    </div>

    <section>
      <h2 class="wds-text-lg">Fix</h2>
      <span>位置錯了? 重新渲染 </span>
      <WButton text="渲染" @click="reRender" />
    </section>
    <!-- 歷史單字 -->
    <section class="wds-mt-4">
      <h2 class="wds-text-lg">History</h2>
      <ul class="wds-flex wds-flex-col wds-gap-1 wds-max-h-96 wds-overflow-auto">
        <li v-for="word in words" :key="word.text" class="wds-flex wds-items-center">
          <span class="wds-mr-auto">
            {{ word.text }}
          </span>
          <WButton text="刪除單字" @click="onRemoveWord(word)" />
        </li>
      </ul>
    </section>
  </div>
</template>
