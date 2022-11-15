import KeyWord from '../KeyWord'
import add from '../matcher/add'
import create from '../matcher/create'
import TokenType from '../TokenType'
import charAsyncIterable from './charAsyncIterable'
import TryGetToken from './TryGetToken'

const parseKeyword: TryGetToken = async stream => {
  const keyWordStrings: Record<string, KeyWord> = {
    private: KeyWord.PRIVATE,
    unnamed_addr: KeyWord.UNNAMED_ADDR,
    constant: KeyWord.CONSTANT,
    x: KeyWord.X,
    declare: KeyWord.DECLARE,
    define: KeyWord.DEFINE,
    EntryBlock: KeyWord.ENTRY_BLOCK,
    getelementptr: KeyWord.GET_ELEMENT_PTR,
    inbounds: KeyWord.INBOUNDS,
    ret: KeyWord.RETURN
  }

  const matcher = create(Object.keys(keyWordStrings))
  /**
   * These have characters other than letters.
   * Do not put strings more than 1 char long in this arr.
   */
  const specialTokens: Record<string, KeyWord> = {
    '=': KeyWord.EQUALS,
    ':': KeyWord.COLON,
    '*': KeyWord.ASTERISK
  }
  let exactMatch: number | undefined
  for await (const char of charAsyncIterable(stream)) {
    add(matcher, char)
    if (matcher.matches.length === 0) {
      if (exactMatch !== undefined) {
        if (!/\w/.test(char)) {
          return {
            token: {
              type: TokenType.KEY_WORD,
              data: keyWordStrings[matcher.find[exactMatch]]
            },
            length: matcher.find[exactMatch].length
          }
        } else {
          return
        }
      } else {
        if (Object.keys(specialTokens).includes(char)) {
          return {
            token: {
              type: TokenType.KEY_WORD,
              data: specialTokens[char]
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
        type: TokenType.KEY_WORD,
        data: keyWordStrings[matcher.find[exactMatch]]
      },
      length: matcher.find[exactMatch].length
    }
  }
}

export default parseKeyword
