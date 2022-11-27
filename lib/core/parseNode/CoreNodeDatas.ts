import CoreNodeType from './CoreNodeType'
import FunctionTypeData from './FunctionTypeData'

interface CoreNodeDatas {
  [CoreNodeType.FUNCTION]: {
    name: string
    inputNames: string[]
    type: FunctionTypeData
  }
  [CoreNodeType.DECLARE]: {
    name: string
    type: FunctionTypeData
  }
  [CoreNodeType.TYPE]: {
    type: any
    data: any
  }
}

export default CoreNodeDatas
