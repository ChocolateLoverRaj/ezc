import EnumItemWithData from '../EnumItemWithData'
import IdentifierType from '../IdentifierType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import FloatType from './FloatType'
import FunctionTypeData from './FunctionTypeData'
import ConstantOrGlobal from './ConstantOrGlobal'
import Linkage from './Linkage'

interface CoreNodeDatas {
  [CoreNodeType.FUNCTION]: {
    name: string
    inputNames: string[]
    type: FunctionTypeData
    inside: any
  }
  [CoreNodeType.DECLARE]: {
    name: string
    type: FunctionTypeData
  }
  [CoreNodeType.GLOBAL_VARIABLE]: {
    constantOrGlobal: ConstantOrGlobal
    align: number | undefined
    unnamed_addr: boolean
    linkage: Linkage
    identifier: CoreNodesWithData[CoreNodeType.IDENTIFIER]
    type: EnumItemWithData
    value: EnumItemWithData
  }
  [CoreNodeType.STRING]: string
  [CoreNodeType.INTEGER_TYPE]: number
  [CoreNodeType.FLOAT_TYPE]: FloatType
  [CoreNodeType.POINTER_TYPE]: undefined
  [CoreNodeType.ARRAY_TYPE]: {
    itemsType: EnumItemWithData
    length: number
  }
  [CoreNodeType.STRUCT_TYPE]: EnumItemWithData[]
  [CoreNodeType.IDENTIFIER]: {
    type: IdentifierType
    name: string
  }
  [CoreNodeType.NUMBER]: number
  [CoreNodeType.VOID_TYPE]: undefined
}

export default CoreNodeDatas
