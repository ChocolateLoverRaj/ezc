import EnumItemWithData from '../EnumItemWithData'

interface ParsedToken<T extends EnumItemWithData> {
  token: T
  /**
   * For example, the token `i32` would have a length of `3`
   */
  length: number
}

export default ParsedToken
