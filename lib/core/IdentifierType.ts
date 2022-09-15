enum IdentifierType {
  /**
   * Example:
   * ```ll
   * @0 = private unnamed_addr constant [13 x i8] c"Hello World!\00" align 1
   *
   * declare i32 @puts(i8*)
   *
   * define i1 main(...) {}
   */
  AT,
  /**
   * For variables
   */
  PERCENT
}

export default IdentifierType
