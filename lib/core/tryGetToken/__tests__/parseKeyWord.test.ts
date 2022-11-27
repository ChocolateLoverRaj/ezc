import KeyWord from '../../KeyWord'
import CoreTokenType from '../../CoreTokenType'
import coreParseKeywordOptions from '../coreParseKeywordOptions'
import parseKeyword from '../parseKeyword'

test('=', async () => {
  await expect(parseKeyword(coreParseKeywordOptions)({
    async * [Symbol.asyncIterator] () {
      yield '='
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: KeyWord,
        id: KeyWord.EQUALS
      }
    },
    length: 1
  })
})

test('ret', async () => {
  await expect(parseKeyword(coreParseKeywordOptions)({
    async * [Symbol.asyncIterator] () {
      yield 'ret'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: KeyWord,
        id: KeyWord.RETURN
      }
    },
    length: 3
  })
})

test('getelementptr', async () => {
  await expect(parseKeyword(coreParseKeywordOptions)({
    async * [Symbol.asyncIterator] () {
      yield 'getelementptr'
    }
  })).resolves.toEqual({
    token: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: KeyWord,
        id: KeyWord.GET_ELEMENT_PTR
      }
    },
    length: 'getelementptr'.length
  })
})

test("doesn't parse if trailing letters", async () => {
  await expect(parseKeyword(coreParseKeywordOptions)({
    async * [Symbol.asyncIterator] () {
      // cspell:disable-next-line
      yield 'getelementptrabc'
    }
  })).resolves.toBeUndefined()
})

describe('custom options', () => {
  test('custom single char keyword', async () => {
    await expect(parseKeyword({
      singleCharKeywords: {
        '<': {
          enum: KeyWord,
          id: KeyWord.RETURN
        }
      },
      letterKeywords: {}
    })({
      async * [Symbol.asyncIterator] () {
        yield '<'
      }
    })).resolves.toEqual({
      token: {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.KEY_WORD
        },
        data: {
          enum: KeyWord,
          id: KeyWord.RETURN
        }
      },
      length: 1
    })
  })
})
