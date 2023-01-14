import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import IdentifierType from '../IdentifierType'
import UnparseToken from './UnparseToken'

const unparseIdentifier: UnparseToken<CoreTokenDatas[CoreTokenType.IDENTIFIER]> = (
  { name, type }
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
