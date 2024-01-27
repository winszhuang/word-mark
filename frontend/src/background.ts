import {
  onInstalled,
  onStorageChanged,
  createTab,
  sendMessage,
  sendMessageToAllTabs
} from './utils/chrome.ts'
import { Event, EventSource } from './enums/event.enum.ts'

onInstalled(() => {
  createTab({ url: 'options.html' })
})

onStorageChanged((change) => {
  console.warn('此次storage的更新 : ')
  console.warn(change)
  console.warn('此次storage的更新 ---')

  const data = {
    event: Event.UPDATE_WORDS,
    data: change?.words?.newValue as Record<string, Word>,
    from: EventSource.BACKGROUND
  }

  sendMessage(data)
  sendMessageToAllTabs(data)
})
