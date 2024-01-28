/// tabs
export async function createTab(createProperties: chrome.tabs.CreateProperties) {
  return chrome.tabs.create(createProperties)
}

export async function sendMessage<T extends ChromeMessage<any>>(req: T) {
  return chrome.runtime.sendMessage<T>(req)
}

export async function sendMessageToTab<T extends ChromeMessage<any>>(tabId: number, req: T) {
  return chrome.tabs.sendMessage<T>(tabId, req)
}

export async function sendMessageToAllTabs<T extends ChromeMessage<any>>(req: T) {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({}, (tabs) => {
      // 將每個 sendMessageToTab 調用轉換為一個 Promise
      const promises = tabs.map((tab) => sendMessageToTab<T>(tab.id!, req))
      // 使用 Promise.all 等待所有的 Promise 完成
      Promise.all(promises).then(resolve).catch(reject)
    })
  })
}

export async function sendMessageToActiveTab<T extends ChromeMessage<any>>(req: T) {
  const activeTab = await getActiveTab()
  return sendMessageToTab<T>(activeTab.id!, req)
}

export async function getActiveTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0]
}

export function forEachAllTab(callback: (tab: chrome.tabs.Tab) => void) {
  chrome.tabs.query({}, (tabs) => {
    for (const tab of tabs) {
      callback(tab)
    }
  })
}

export function onTabActivated(callback: (tab: chrome.tabs.TabActiveInfo) => void) {
  chrome.tabs.onActivated.addListener((tab) => {
    callback(tab)
  })
}

/// runtime
export function onInstalled(callback: (details: chrome.runtime.InstalledDetails) => void) {
  chrome.runtime.onInstalled.addListener(callback)
}

export function onMessage<T extends ChromeMessage<any>>(
  callback: (message: T, sender: chrome.runtime.MessageSender, sendResponse: any) => void
) {
  chrome.runtime.onMessage.addListener(callback)
}

/// storage
export function onStorageChanged(
  callback: (changes: Record<string, chrome.storage.StorageChange>, areaName: string) => void
) {
  chrome.storage.onChanged.addListener(callback)
}
