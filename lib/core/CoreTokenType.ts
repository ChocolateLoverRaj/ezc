enum CoreTokenType {
  // FIXME: Identifier might be better if it's split into the @/%, name as separate tokens
  IDENTIFIER,
  NUMBER_LITERAL,
  INTEGER_TYPE,
  STRING_LITERAL,
  ENTRY_BLOCK,
  KEY_WORD,
  OPEN_CLOSE
}

export default CoreTokenType
