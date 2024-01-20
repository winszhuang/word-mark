import { WordStore } from '../store/words.store'
import Swal from 'sweetalert2'

const wordStore = new WordStore()

export function useWords() {
  const wordHandler = {
    add: async (word: Word) => {
      const isOk = await wordStore.add(word)
      Swal.fire({
        title: isOk ? 'Success!' : 'Error',
        text: isOk ? 'Word added successfully' : 'word already exists',
        icon: isOk ? 'success' : 'error',
        confirmButtonText: 'confirm'
      })
    },
    get: async (text: string) => {
      const word = await wordStore.get(text)
      Swal.fire({
        title: word ? 'Success!' : 'Error',
        text: word ? 'find word successfully' : 'word not found',
        icon: word ? 'success' : 'error',
        confirmButtonText: 'confirm'
      })
    },
    getAll: async () => {
      return wordStore.getAll()
    },
    delete: async (text: string) => {
      const isOk = await wordStore.delete(text)
      Swal.fire({
        title: isOk ? 'Success!' : 'Error',
        text: isOk ? 'delete word successfully' : 'word not found',
        icon: isOk ? 'success' : 'error'
      })
    }
  }

  return {
    wordHandler
  }
}
