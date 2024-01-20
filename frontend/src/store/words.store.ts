type WordMap = Record<string, Word>

interface IWordRepository {
  add(word: Word): Promise<boolean>
  get(text: string): Promise<Word | null>
  getAll(): Promise<WordMap>
  delete(text: string): Promise<boolean>
}

const WORD_STORE_KEY = 'words'

export class WordStore implements IWordRepository {
  private chromeStorage = chrome.storage.local
  private wordMap: WordMap = {}

  constructor() {
    this.getAll().then((data) => {
      this.wordMap = data
    })
  }

  syncToStorage() {
    return this.chromeStorage.set({
      [WORD_STORE_KEY]: this.wordMap
    })
  }

  async getAll() {
    const { words } = (await this.chromeStorage.get(WORD_STORE_KEY)) as {
      words: WordMap
    }
    return words ?? {}
  }

  async add(word: Word) {
    if (this.wordMap[word.text]) return false
    this.wordMap[word.text] = word
    await this.syncToStorage()
    return true
  }

  async delete(text: string) {
    if (!this.wordMap[text]) {
      return false
    }
    delete this.wordMap[text]
    await this.syncToStorage()
    return true
  }

  get(text: string): Promise<Word | null> {
    return new Promise((resolve) => {
      if (!this.wordMap[text]) {
        return resolve(null)
      }
      resolve(this.wordMap[text])
    })
  }
}
