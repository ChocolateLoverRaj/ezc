import EnumItemWithData from '../EnumItemWithData'
import CoreNodeType from './CoreNodeType'
import FloatType from './FloatType'
import FunctionTypeData from './FunctionTypeData'
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
  [CoreNodeType.VARIABLE]: {
    global: boolean
    constant: boolean
    align: number | undefined
    unnamed_addr: boolean
    linkage: Linkage
    name: string
    type: EnumItemWithData
    value: any
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
}

export default CoreNodeDatas
