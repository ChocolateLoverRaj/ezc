import add from '../matcher/add'
import create from '../matcher/create'
import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'
import ParseKeywordOptions from './ParseKeywordOptions'

const parseKeyword = (
  { singleCharKeywords, letterKeywords }: ParseKeywordOptions
): TryGetToken<CoreTokensWithData[CoreTokenType.KEY_WORD]> => async stream => {
  const matcher = create(Object.keys(letterKeywords))
  let exactMatch: number | undefined
  for await (const char of charAsyncIterable(stream)) {
    add(matcher, char)
    if (matcher.matches.length === 0) {
      if (exactMatch !== undefined) {
        if (!/\w/.test(char)) {
          return {
            token: {
              type: {
                enum: CoreTokenType,
                id: CoreTokenType.KEY_WORD
              },
              data: letterKeywords[matcher.find[exactMatch]]
            },
            length: matcher.find[exactMatch].length
          }
        } else {
          return
        }
      } else {
        if (Object.keys(singleCharKeywords).includes(char)) {
          return {
            token: {
              type: {
                enum: CoreTokenType,
                id: CoreTokenType.KEY_WORD
              },
              data: singleCharKeywords[char]
            },
            length: 1
          }
        }
      }
    } else {
      exactMatch = matcher.matches.find(index => matcher.find[index].length === matcher.index)
    }
  }
  if (exactMatch !== undefined) {
    return {
      token: {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: letterKeywords[matcher.find[exactMatch]]
      },
      length: matcher.find[exactMatch].length
    }
  }
}

export default parseKeyword
