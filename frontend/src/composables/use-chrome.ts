import { Subject } from 'rxjs'
import { ref } from 'vue'

type Change = Record<string, chrome.storage.StorageChange>

export function useChrome() {
  const afterInstall$ = new Subject<void>()
  chrome.runtime.onInstalled?.addListener(() => {
    afterInstall$.next()
  })

  const localChange$ = new Subject<Change>()
  chrome.storage.onChanged.addListener((change) => {
    localChange$.next(change)
  })

  const receiveMessage$ = new Subject<any>()
  const receiveTabMessage$ = new Subject<any>()
  const receiveActiveTabMessage$ = new Subject<any>()
  chrome.runtime.onMessage.addListener((req, sender) => {
    receiveMessage$.next(req)

    const tab = sender.tab
    if (tab) {
      receiveTabMessage$.next(req)
      if (tab.id === activeTabId.value) {
        receiveActiveTabMessage$.next(req)
      }
    }
  })

  const tabChange$ = new Subject<chrome.tabs.TabActiveInfo>()
  chrome.tabs?.onActivated.addListener((tab) => {
    tabChange$.next(tab)
  })

  const activeTabId = ref(-1)
  tabChange$.subscribe(({ tabId }) => {
    activeTabId.value = tabId
  })

  function createTab(createProperties: chrome.tabs.CreateProperties) {
    return chrome.tabs.create(createProperties)
  }

  function sendMessageToTab<T>(tabId: number, req: T) {
    return chrome.tabs.sendMessage<T>(tabId, req)
  }

  function sendMessageToActiveTab<T>(req: T) {
    console.log('activeTabId.value', activeTabId.value)
    return sendMessageToTab<T>(activeTabId.value, req)
  }

  function forEachAllTab(callback: (tab: chrome.tabs.Tab) => void) {
    chrome.tabs.query({}, (tabs) => {
      for (const tab of tabs) {
        callback(tab)
      }
    })
  }

  return {
    createTab,
    sendMessageToTab,
    sendMessageToActiveTab,
    forEachAllTab,

    onInstalled: afterInstall$,
    onLocalChange: localChange$,
    onMessageUpdate: receiveMessage$,
    onTabMessageUpdate: receiveTabMessage$,
    onActiveTabMessageUpdate: receiveActiveTabMessage$
  }
}
