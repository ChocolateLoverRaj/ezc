import SimplifiedTypeDatas from './SimplifiedTypeDatas'

type SimplifiedTypesWithData = {
  [K in keyof SimplifiedTypeDatas]: {
    type: K
    data: SimplifiedTypeDatas[K]
  }
}

export default SimplifiedTypesWithData
