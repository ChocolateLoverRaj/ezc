import CoreTokenWithData from '../CoreTokenWithData'
import coreParseKeywordOptions from './coreParseKeywordOptions'
import parseIdentifier from './parseIdentifier'
import parseIntegerType from './parseIntegerType'
import parseKeyword from './parseKeyword'
import parseNumberLiteral from './parseNumberLiteral'
import parseOpenClose from './parseOpenClose'
import parseStringLiteral from './parseStringLiteral'
import TryGetToken from './TryGetToken'

const coreTryers: ReadonlyArray<TryGetToken<CoreTokenWithData>> = [
  parseIdentifier,
  parseIntegerType,
  parseKeyword(coreParseKeywordOptions),
  parseNumberLiteral,
  parseOpenClose,
  parseStringLiteral
] as const

export default coreTryers
