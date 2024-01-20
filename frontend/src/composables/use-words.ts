import { WordStore } from '../store/words.store'
import { Resp } from '../utils/resp'
import Swal from 'sweetalert2'

const wordStore = new WordStore()

export function useWords() {
  const withAlert = (fn: () => Resp<any>) => {
    const { success, message } = fn()
    Swal.fire({
      title: success ? 'Success!' : 'Error',
      text: message,
      icon: success ? 'success' : 'error',
      confirmButtonText: 'confirm'
    })
  }

  return {
    wordHandler: {
      add: (word: Word) => withAlert(() => wordStore.add(word)),
      get: (text: string) => withAlert(() => wordStore.get(text)),
      delete: (text: string) => withAlert(() => wordStore.delete(text))
    }
  }
}
