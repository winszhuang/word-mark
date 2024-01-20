export class Resp<T> {
  data: T
  success: boolean
  message: string

  constructor(data: T, success: boolean, message: string) {
    this.data = data
    this.success = success
    this.message = message
  }
}

export class ErrorResp extends Resp<null> {
  constructor(message: string) {
    super(null, false, message)
  }
}

export class SuccessResp<T> extends Resp<T> {
  constructor(data: T, message: string) {
    super(data, true, message)
  }
}
