import UnparsedPartDatas from './UnparsedPartDatas'

type TypeToPart = {
  [K in keyof UnparsedPartDatas]: {
    type: K
    data: UnparsedPartDatas[K]
  }
}

type UnparsedPart = TypeToPart[keyof TypeToPart]

export default UnparsedPart
