import CoreNodeDatas from './CoreNodeDatas'
import CoreNodeType from './CoreNodeType'

type CoreNodesWithData = {
  [K in keyof CoreNodeDatas]: {
    type: {
      enum: typeof CoreNodeType
      id: number
    }
    data: CoreNodeDatas[K]
  }
}

export default CoreNodesWithData
