import EnumItemWithData from '../EnumItemWithData'
import parseNumber from './parseNumber'
import parseString from './parseString'
import TryParseNode from './TryParseNode'

const coreValueParsers: ReadonlyArray<TryParseNode<EnumItemWithData>> = [
  parseString,
  parseNumber
]

export default coreValueParsers
