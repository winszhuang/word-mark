import { Subject } from 'rxjs'
import { WordStore } from '../store/words.store'
import { onMounted, shallowRef } from 'vue'

const wordStore: IWordRepository = new WordStore()

export function useWords(onWordsUpdate: Subject<UpdateWordsMessage>) {
  const words = shallowRef<Record<string, Word>>({})

  onMounted(() => {
    wordStore.getAll().then((w) => {
      words.value = w
    })
  })

  onWordsUpdate.subscribe((msg) => {
    words.value = msg.data
  })

  return {
    wordStore,
    words
  }
}
