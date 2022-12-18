import CoreKeyWord from '../CoreKeyWord'
import Keywords from './Keywords'
import ParseKeywordOptions from './ParseKeywordOptions'

const coreLetterKeywords: Record<string, CoreKeyWord> = {
  private: CoreKeyWord.PRIVATE,
  unnamed_addr: CoreKeyWord.UNNAMED_ADDR,
  constant: CoreKeyWord.CONSTANT,
  x: CoreKeyWord.X,
  declare: CoreKeyWord.DECLARE,
  define: CoreKeyWord.DEFINE,
  EntryBlock: CoreKeyWord.ENTRY_BLOCK,
  getelementptr: CoreKeyWord.GET_ELEMENT_PTR,
  inbounds: CoreKeyWord.INBOUNDS,
  ret: CoreKeyWord.RETURN,
  ptr: CoreKeyWord.PTR,
  global: CoreKeyWord.GLOBAL,
  nocapture: CoreKeyWord.NO_CAPTURE,
  noalias: CoreKeyWord.NO_ALIAS,
  void: CoreKeyWord.VOID,
  nofree: CoreKeyWord.NO_FREE
}

const coreSingleCharKeywords: Record<string, CoreKeyWord> = {
  '=': CoreKeyWord.EQUALS,
  ',': CoreKeyWord.COMMA
}

const convertToKeywords = (coreKeywords: Record<string, CoreKeyWord>): Keywords =>
  Object.fromEntries(Object.entries(coreKeywords).map(([key, value]) =>
    [key, { enum: CoreKeyWord, id: value }]))

const coreParseKeywordOptions: ParseKeywordOptions = {
  letterKeywords: convertToKeywords(coreLetterKeywords),
  singleCharKeywords: convertToKeywords(coreSingleCharKeywords)
}

export default coreParseKeywordOptions
