import EnumItemWithData from '../EnumItemWithData'
import InputFlag from './InputFlag'

interface InputType {
  /**
   * The actual type, like `i8` or `ptr`
   */
  type: EnumItemWithData
  flags: InputFlag[]
}

export default InputType
