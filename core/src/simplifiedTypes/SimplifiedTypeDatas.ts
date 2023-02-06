import FloatType from '../parseNode/FloatType'
import SimplifiedType from './SimplifiedType'
import SimplifiedTypeWithData from './SimplifiedTypeWithData'

interface SimplifiedTypeDatas {
  [SimplifiedType.NUMBER]: FloatType | undefined
  [SimplifiedType.VOID]: undefined
  [SimplifiedType.POINTER]: undefined
  [SimplifiedType.ARRAY]: {
    numberOfElements: number
    type: SimplifiedTypeWithData[]
  }
  [SimplifiedType.STRUCT]: SimplifiedTypeWithData[][]
}

export default SimplifiedTypeDatas
