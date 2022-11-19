import CoreTokenWithData from '../CoreTokenWithData'
import parseIdentifier from './parseIdentifier'
import parseIntegerType from './parseIntegerType'
import parseKeyword from './parseKeyword'
import parseNumberLiteral from './parseNumberLiteral'
import parseOpenClose from './parseOpenClose'
import parseStringLiteral from './parseStringLiteral'
import TryGetToken from './TryGetToken'

const tryers: ReadonlyArray<TryGetToken<CoreTokenWithData>> = [
  parseIdentifier,
  parseIntegerType,
  parseKeyword,
  parseNumberLiteral,
  parseOpenClose,
  parseStringLiteral
] as const

export default tryers
