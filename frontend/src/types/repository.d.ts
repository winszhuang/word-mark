type WordMap = Record<string, Word>

interface IWordRepository {
  add(word: Word): Promise<boolean>
  get(text: string): Promise<Word | null>
  getAll(): Promise<WordMap>
  delete(text: string): Promise<boolean>
}
