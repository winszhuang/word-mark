type ChromeMessage<T> = {
  event: import('../enums/event.enum.ts').Event
  data: T
  from: import('../enums/event.enum.ts').EventSource
}

type UpdateWordsMessage = ChromeMessage<Record<string, Word>>
type RenderWordsMessage = ChromeMessage<boolean>
type AlertMessage = ChromeMessage<Alert>
type EnableMessage = ChromeMessage<boolean>
