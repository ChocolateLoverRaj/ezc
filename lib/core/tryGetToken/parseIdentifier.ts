import IdentifierType from '../IdentifierType'
import CoreTokensWithData from '../CoreTokensWithData'
import TokenType from '../TokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'

const parseIdentifier: TryGetToken<CoreTokensWithData[TokenType.IDENTIFIER]> = async stream => {
  const iterator = charAsyncIterable(stream)[Symbol.asyncIterator]()
  const identifierType = await (async (): Promise<IdentifierType | undefined> => {
    const { value, done } = await iterator.next()
    if (done === true) return
    switch (value) {
      case '@':
        return IdentifierType.AT
      case '%':
        return IdentifierType.PERCENT
    }
  })()
  if (identifierType === undefined) return
  let name = ''
  while (true) {
    const { value, done } = await iterator.next()
    if (done === true) {
      break
    }
    // From https://llvm.org/docs/LangRef.html#identifiers
    if (/[-a-zA-Z$._0-9]/.test(value)) {
      name += value
    } else {
      break
    }
  }
  if (name.length === 0) return
  return {
    token: {
      type: {
        enum: TokenType,
        id: TokenType.IDENTIFIER
      },
      data: {
        type: identifierType,
        name
      }
    },
    length: 1 + name.length
  }
}

export default parseIdentifier
