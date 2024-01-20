import { Event } from '../enums/event.enum.ts'

type ChromeMessage<T> = {
  event: Event
  data: T
}

type UpdateWordsMessage = ChromeMessage<Record<string, Word>>
