interface InputController {
  /**
   * This means the beggining `<length>` bytes are proccessed needed.
   */
  free: (length: number) => Promise<void>
  get: (length: number) => AsyncIterable<string>
}

export default InputController
