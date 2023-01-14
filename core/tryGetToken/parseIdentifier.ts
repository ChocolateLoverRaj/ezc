import IdentifierType from '../IdentifierType'
import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'
import splitAsyncIterator from '../../util/splitAsyncIterator/splitAsyncIterator'
import skip from '../../util/splitAsyncIterator/skip'

const parseIdentifier: TryGetToken<CoreTokensWithData[CoreTokenType.IDENTIFIER]> = async stream => {
  const iterable = splitAsyncIterator(charAsyncIterable(stream)[Symbol.asyncIterator]())
  const identifierType = await (async (): Promise<IdentifierType | undefined> => {
    const { value, done } = await iterable.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    switch (value) {
      case '@':
        return IdentifierType.AT
      case '%':
        return IdentifierType.PERCENT
    }
  })()
  const isBlockIdentifier = identifierType === undefined
  if (!isBlockIdentifier) {
    skip(iterable, 1)
  }
  let name = ''
  while (true) {
    const { value, done } = await iterable.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) {
      break
    }
    // From https://llvm.org/docs/LangRef.html#identifiers
    if (/[-a-zA-Z$._0-9]/.test(value)) {
      name += value
      skip(iterable, 1)
    } else {
      break
    }
  }
  if (name.length === 0) return
  if (isBlockIdentifier) {
    const { value, done } = await iterable.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (value === ':') {
      skip(iterable, 1)
      return {
        token: {
          type: {
            enum: CoreTokenType,
            id: CoreTokenType.IDENTIFIER
          },
          data: {
            type: IdentifierType.BLOCK,
            name
          }
        },
        length: name.length + 1
      }
    }
  } else {
    return {
      token: {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.IDENTIFIER
        },
        data: {
          type: identifierType,
          name
        }
      },
      length: 1 + name.length
    }
  }
}

export default parseIdentifier
