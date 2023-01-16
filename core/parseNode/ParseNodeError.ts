import EnumItem from '../EnumItem'

interface ParsedNodeError<T extends EnumItem> {
  type: T
  index: number
  message: string
  subAttempts: Array<ParsedNodeError<EnumItem>> | undefined
}

export default ParsedNodeError
