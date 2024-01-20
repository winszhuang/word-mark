import { Event } from './enums/event.enum.ts'

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
  chrome.runtime.sendMessage(Event.UPDATE_WORDS)
})
