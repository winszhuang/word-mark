import { useChrome } from './composables/use-chrome.ts'
import { Event, EventSource } from './enums/event.enum.ts'
import { UpdateWordsMessage } from '@/types/message'

const { onInstalled, onLocalChange, forEachAllTab, createTab, sendMessageToTab } = useChrome()

onInstalled.subscribe(() => {
  createTab({
    url: 'options.html'
  })
})

onLocalChange.subscribe((change) => {
  console.warn('此次storage的更新 : ')
  console.warn(change)
  console.warn('此次storage的更新 ---')

  forEachAllTab((tab) => {
    sendMessageToTab<UpdateWordsMessage>(tab.id!, {
      event: Event.UPDATE_WORDS,
      data: change?.words?.newValue as Record<string, Word>,
      from: EventSource.BACKGROUND
    })
  })
})
