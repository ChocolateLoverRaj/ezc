import CoreTokenWithData from '../CoreTokenWithData'
import parseIdentifier from './parseIdentifier'
import parseIntegerType from './parseIntegerType'
import coreInput from './parseKeyword/coreInput'
import parseKeyword from './parseKeyword/parseKeyword'
import parseNumberLiteral from './parseNumberLiteral'
import parseStringLiteral from './parseStringLiteral'
import TryGetToken from './TryGetToken'

const coreTryers: ReadonlyArray<TryGetToken<CoreTokenWithData>> = [
  parseIntegerType,
  parseKeyword(coreInput),
  parseStringLiteral,
  parseIdentifier,
  parseNumberLiteral
] as const

export default coreTryers
