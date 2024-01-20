import { SuccessResp, ErrorResp, Resp } from '../utils/resp'

interface IWordStore {
  add(word: Word): Resp<boolean | null>
  get(text: string): Resp<Word | null>
  delete(text: string): Resp<boolean | null>
}

export class WordStore implements IWordStore {
  private words: Record<string, Word> = {}

  constructor() {
    this.words = JSON.parse(localStorage.getItem('words') || '{}')
  }

  private update(word: Word) {
    this.words[word.text] = word
    this.syncToLocalStorage()
  }

  private syncToLocalStorage() {
    localStorage.setItem('words', JSON.stringify(this.words))
  }

  add(word: Word): Resp<boolean | null> {
    if (this.words[word.text]) {
      return new ErrorResp('word already exists')
    }
    this.update(word)
    return new SuccessResp(true, 'word added successfully')
  }

  get(text: string): Resp<Word | null> {
    if (!this.words[text]) {
      return new ErrorResp('word not found')
    }
    return new SuccessResp(this.words[text], 'find word successfully')
  }

  delete(text: string): Resp<boolean | null> {
    if (!this.words[text]) {
      return new ErrorResp('word not found')
    }

    return new SuccessResp(true, 'delete word successfully')
  }
}
