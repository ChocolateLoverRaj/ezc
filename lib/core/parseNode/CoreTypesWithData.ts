import CoreTypeDatas from './CoreTypeDatas'
import CoreTypeType from './CoreTypeType'

type CoreTypeWithData = {
  [K in keyof CoreTypeDatas]: {
    type: {
      enum: typeof CoreTypeType
      id: K
    }
    data: CoreTypeDatas[K]
  }
}

export default CoreTypeWithData
