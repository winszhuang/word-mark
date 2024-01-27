import { WordStore } from '../store/words.store'

const wordStore = new WordStore()

export function useWords() {
  return wordStore
}
