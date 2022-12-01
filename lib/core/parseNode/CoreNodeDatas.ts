import EnumItem from '../EnumItem'
import CoreNodeType from './CoreNodeType'
import FunctionTypeData from './FunctionTypeData'

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
  [CoreNodeType.TYPE]: {
    type: EnumItem
    data: any
  }
}

export default CoreNodeDatas
