enum Token {
  // <
  RETURN,

  // ;
  SEMICOLON,

  // int goodNumber = 3
  INT,
  // byte b = 255
  BYTE,
  // auto a = () > 234
  AUTO,

  // 3, 23423, 93
  NUMBER_LITERAL,

  // "Hello world!"
  STRING_LITERAL,

  // (
  PARENTHESIS_OPEN,
  // )
  PARENTHESIS_CLOSE,

  // myFunction()
  IDENTIFIER,

  // =
  ASSIGNMENT
}

export default Token
