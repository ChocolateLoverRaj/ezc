import EnumItemWithData from '../EnumItemWithData'
import UnparsedPartType from './UnparsedPartType'

interface UnparsedPartDatas extends Record<UnparsedPartType, unknown> {
  [UnparsedPartType.TOKEN]: EnumItemWithData
  [UnparsedPartType.SPACE]: undefined
  [UnparsedPartType.INDENTED_NEW_LINE]: undefined
  [UnparsedPartType.UN_INDENTED_NEW_LINE]: undefined
  [UnparsedPartType.NODE]: EnumItemWithData
}

export default UnparsedPartDatas
