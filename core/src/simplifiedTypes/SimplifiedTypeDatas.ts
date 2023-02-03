import SimplifiedType from './SimplifiedType'
import SimplifiedTypeWithData from './SimplifiedTypeWithData'

interface SimplifiedTypeDatas {
  [SimplifiedType.NUMBER]: undefined
  [SimplifiedType.VOID]: undefined
  [SimplifiedType.POINTER]: undefined
  [SimplifiedType.ARRAY]: {
    numberOfElements: number
    type: SimplifiedTypeWithData
  }
  [SimplifiedType.STRUCT]: SimplifiedTypeWithData[]
}

export default SimplifiedTypeDatas
