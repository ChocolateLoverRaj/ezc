enum IdentifierType {
  /**
   * Example:
   * ```ll
   * @0 = private unnamed_addr constant [13 x i8] c"Hello World!\00"
   *
   * declare i32 @puts(i8*)
   *
   * define i1 main(...) {}
   * ```
   */
  AT,
  /**
   * For variables
   */
  PERCENT,
  /**
   * For blocks. Example:
   * ```ll
   * EntryBlock:
   * ```
   */
  BLOCK
}

export default IdentifierType
