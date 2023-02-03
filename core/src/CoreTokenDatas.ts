import IdentifierType from './IdentifierType'
import CoreTokenType from './CoreTokenType'
import EnumItem from './EnumItem'
import FloatType from './parseNode/FloatType'

interface CoreTokenDatas {
  [CoreTokenType.IDENTIFIER]: {
    type: IdentifierType
    name: string
  }
  [CoreTokenType.KEY_WORD]: EnumItem
  [CoreTokenType.NUMBER_LITERAL]: {
    value: number
    /**
     * `undefined` for integers
     */
    floatType: FloatType | undefined
  }
  [CoreTokenType.INTEGER_TYPE]: number
  [CoreTokenType.STRING_LITERAL]: string
}

export default CoreTokenDatas
