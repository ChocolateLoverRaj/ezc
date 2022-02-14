enum Token {
  // <
  ARROW_LEFT,
  // >
  ARROW_RIGHT,
  // ;
  SEMICOLON,
  // (
  PARENTHESIS_OPEN,
  // )
  PARENTHESIS_CLOSE,
  // =
  ASSIGNMENT,
  // ,
  COMMA,
  // {
  CURLY_BRACKET_OPEN,
  // }
  CURLY_PRACKET_CLOSE,

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

  // myFunction()
  IDENTIFIER
}

export default Token
