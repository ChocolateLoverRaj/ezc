import EnumItem from '../EnumItem'
import EnumItemWithData from '../EnumItemWithData'

interface InputType {
  /**
   * The actual type, like `i8` or `ptr`
   */
  type: EnumItemWithData
  flags: EnumItem[]
}

export default InputType
