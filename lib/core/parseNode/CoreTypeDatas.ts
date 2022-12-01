import CoreTypeType from './CoreTypeType'
import CoreTypeWithData from './CoreTypesWithData'
import FloatType from './FloatType'

interface CoreTypeDatas {
  [CoreTypeType.INTEGER]: number
  [CoreTypeType.FLOAT]: FloatType
  [CoreTypeType.POINTER]: undefined
  [CoreTypeType.ARRAY]: {
    itemsType: CoreTypeWithData
    length: number
  }
  [CoreTypeType.STRUCT]: CoreTypeWithData[]
}

export default CoreTypeDatas
