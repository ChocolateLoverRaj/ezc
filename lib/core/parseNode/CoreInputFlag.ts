/**
 * From https://llvm.org/docs/LangRef.html#parameter-attributes
 * Idk when to really use theses flags, so I'm only including two for now
 */
enum CoreInputFlag {
  NO_CAPTURE,
  NO_ALIAS,
  NO_FREE
}

export default CoreInputFlag
