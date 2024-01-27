<script setup lang="ts">
import { useChromeMessage } from '../../src/composables/use-chrome-message'
import WButton from '../../src/components/WButton.vue'
import { onMounted, shallowRef } from 'vue'
import { useWords } from '../../src/composables/use-words'
import { useChrome } from '../../src/composables/use-chrome'
import { RenderWordsMessage } from '@/types/message'
import { Event, EventSource } from '../../src/enums/event.enum.ts'

const words = shallowRef<Record<string, Word>>({})

const { onWordsUpdate } = useChromeMessage()
onWordsUpdate.subscribe((res) => (words.value = res.data))

const { wordHandler } = useWords()

onMounted(() => {
  wordHandler.getAll().then((w) => {
    words.value = w
  })
})

const { sendMessageToActiveTab } = useChrome()
function reRender() {
  console.log('reRender')
  sendMessageToActiveTab<RenderWordsMessage>({
    event: Event.RENDER_WORDS,
    data: true,
    from: EventSource.POPUP
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
          <WButton text="刪除單字" />
        </li>
      </ul>
    </section>
  </div>
</template>
