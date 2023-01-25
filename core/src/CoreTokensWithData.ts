import CoreTokenDatas from './CoreTokenDatas'
import CoreTokenType from './CoreTokenType'

type CoreTokensWithData = {
  [K in keyof CoreTokenDatas]: {
    type: {
      enum: typeof CoreTokenType
      id: CoreTokenType
    }
    data: CoreTokenDatas[K]
  }
}

export default CoreTokensWithData
