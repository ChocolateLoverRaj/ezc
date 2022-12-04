import KeyWord from '../KeyWord'
import Keywords from './Keywords'
import ParseKeywordOptions from './ParseKeywordOptions'

const coreLetterKeywords: Record<string, KeyWord> = {
  private: KeyWord.PRIVATE,
  unnamed_addr: KeyWord.UNNAMED_ADDR,
  constant: KeyWord.CONSTANT,
  x: KeyWord.X,
  declare: KeyWord.DECLARE,
  define: KeyWord.DEFINE,
  EntryBlock: KeyWord.ENTRY_BLOCK,
  getelementptr: KeyWord.GET_ELEMENT_PTR,
  inbounds: KeyWord.INBOUNDS,
  ret: KeyWord.RETURN,
  ptr: KeyWord.PTR,
  global: KeyWord.GLOBAL,
  nocapture: KeyWord.NO_CAPTURE,
  noalias: KeyWord.NO_ALIAS,
  void: KeyWord.VOID
}

const coreSingleCharKeywords: Record<string, KeyWord> = {
  '=': KeyWord.EQUALS,
  ':': KeyWord.COLON,
  ',': KeyWord.COMMA
}

const convertToKeywords = (coreKeywords: Record<string, KeyWord>): Keywords =>
  Object.fromEntries(Object.entries(coreKeywords).map(([key, value]) =>
    [key, { enum: KeyWord, id: value }]))

const coreParseKeywordOptions: ParseKeywordOptions = {
  letterKeywords: convertToKeywords(coreLetterKeywords),
  singleCharKeywords: convertToKeywords(coreSingleCharKeywords)
}

export default coreParseKeywordOptions
