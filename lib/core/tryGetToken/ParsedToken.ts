import TokenWithData from '../TokenWithData'

interface ParsedToken<T extends TokenWithData> {
  token: T
  /**
   * For example, the token `i32` would have a length of `3`
   */
  length: number
}

export default ParsedToken
