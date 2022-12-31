import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import IdentifierType from '../IdentifierType'
import UnparseToken from './UnparseToken'

const unparseIdentifier: UnparseToken<CoreTokensWithData[CoreTokenType.IDENTIFIER]> = (
  { data: { name, type } }
) => {
  switch (type) {
    case IdentifierType.PERCENT:
      return `%${name}`
    case IdentifierType.AT:
      return `@${name}`
    case IdentifierType.BLOCK:
      return `${name}:`
  }
}

export default unparseIdentifier
