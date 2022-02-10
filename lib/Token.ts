enum Token {
  // <
  RETURN,

  // ;
  SEMICOLON,

  // int goodNumber = 3
  INT,

  // 3, 23423, 93
  NUMBER_LITERAL,

  // byte b = 255
  BYTE,

  // "Hello world!"
  STRING_LITERAL,

  // (
  PARENTHESIS_OPEN,
  // )
  PARENTHESIS_CLOSE,

  // auto a = () > 234
  AUTO,

  // myFunction()
  IDENTIFIER
}

export default Token;
