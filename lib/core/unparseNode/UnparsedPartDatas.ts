import EnumItemWithData from '../EnumItemWithData'
import UnparsedPartType from './UnparsedPartType'

interface UnparsedPartDatas extends Record<UnparsedPartType, unknown> {
  [UnparsedPartType.TOKEN]: EnumItemWithData
  [UnparsedPartType.SPACE]: undefined
  [UnparsedPartType.INDENT]: undefined
  [UnparsedPartType.UNINDENT]: undefined
  [UnparsedPartType.NEW_LINE]: undefined
  [UnparsedPartType.NODE]: EnumItemWithData
}

export default UnparsedPartDatas
