import add from '../../matcher/add'
import create from '../../matcher/create'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import charAsyncIterable from '../charAsyncIterable'
import TryGetToken from '../TryGetToken'
import Input from './Input'
import EnumItem from '../../EnumItem'

const parseKeyword = (
  stringToKeyWordMap: Input
): TryGetToken<CoreTokensWithData[CoreTokenType.KEY_WORD]> => async function hello (stream) {
  const letterKeywords = new Map([...stringToKeyWordMap]
    .filter(([string]) => /^\w+$/.test(string)))
  const singleCharKeywords = new Map([...stringToKeyWordMap]
    .filter(([string]) => /^[^\w]$/.test(string)))
  const matcher = create([...letterKeywords.keys()])
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
              data: letterKeywords.get(matcher.find[exactMatch]) as EnumItem
            },
            length: matcher.find[exactMatch].length
          }
        } else {
          return
        }
      } else if (matcher.index === 1 && singleCharKeywords.has(char)) {
        return {
          token: {
            type: {
              enum: CoreTokenType,
              id: CoreTokenType.KEY_WORD
            },
            data: singleCharKeywords.get(char) as EnumItem
          },
          length: 1
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
        data: letterKeywords.get(matcher.find[exactMatch]) as EnumItem
      },
      length: matcher.find[exactMatch].length
    }
  }
}

export default parseKeyword
