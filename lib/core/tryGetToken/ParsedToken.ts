import TokenWithData from '../TokenWIthData'

interface ParsedToken {
  token: TokenWithData
  /**
   * For example, the token `i32` would have a length of `3`
   */
  length: number
}

export default ParsedToken
