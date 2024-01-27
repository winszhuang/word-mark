import { Event, EventSource } from '../enums/event.enum.ts'

type ChromeMessage<T> = {
  event: Event
  data: T
  from: EventSource
}

type UpdateWordsMessage = ChromeMessage<Record<string, Word>>
type RenderWordsMessage = ChromeMessage<boolean>
type AlertMessage = ChromeMessage<Alert>
