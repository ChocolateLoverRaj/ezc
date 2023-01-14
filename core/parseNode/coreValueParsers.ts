import EnumItemWithData from '../EnumItemWithData'
import parseIdentifier from './parseIdentifier'
import parseNumber from './parseNumber'
import parseString from './parseString'
import TryParseNode from './TryParseNode'

const coreValueParsers: ReadonlyArray<TryParseNode<EnumItemWithData>> = [
  parseString,
  parseNumber,
  parseIdentifier
]

export default coreValueParsers
