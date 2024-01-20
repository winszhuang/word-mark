import { Event } from './enums/event.enum.ts'
import { UpdateWordsMessage } from '@/types/message'

chrome.runtime.onInstalled.addListener(() => {
  chrome.tabs.create({
    url: 'options.html'
  })
})

chrome.storage.local.onChanged.addListener(async (change) => {
  // use for testing
  console.warn('此次storage的更新 : ')
  console.warn(change)
  console.warn('此次storage的更新 ---')
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      chrome.tabs.sendMessage<UpdateWordsMessage>(tab.id!, {
        event: Event.UPDATE_WORDS,
        data: change?.words?.newValue as Record<string, Word>
      })
    }
  })
})
