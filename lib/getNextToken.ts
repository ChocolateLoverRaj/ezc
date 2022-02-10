import Token from "./Token";
import Reader from "./Reader";
import TokenWithData from "./TokenWithData";
import digitRegex from './digitRegex'

const getNextToken = (reader: Reader): TokenWithData => {
  const char = reader.getNextChar();
  if (char === "<") {
    reader.doneWithCurrentChar();
    return { token: Token.RETURN };
  }
  if (char === ";") {
    reader.doneWithCurrentChar();
    return { token: Token.SEMICOLON };
  }
  if (char === "(") {
    reader.doneWithCurrentChar();
    return { token: Token.PARENTHESIS_OPEN };
  }
  if (char === ")") {
    reader.doneWithCurrentChar();
    return { token: Token.PARENTHESIS_CLOSE };
  }
  if (digitRegex.test(char)) {
    let numberLiteral = char;
    reader.doneWithCurrentChar()
    {
      let char: string;
      while (digitRegex.test((char = reader.getNextChar()))) {
        numberLiteral += char;
        reader.doneWithCurrentChar();
      }
    }
    return {
      token: Token.NUMBER_LITERAL,
      data: parseInt(numberLiteral, 10)
    };
  }
  if (char === '"') {
    let stringLiteral = "";
    let char: string;
    // FIXME: use \ to escape
    while ((char = reader.getNextChar()) !== "") {
      stringLiteral += char;
      reader.doneWithCurrentChar();
    }
    reader.doneWithCurrentChar();
    return {
      token: Token.STRING_LITERAL,
      data: stringLiteral
    };
  }
  throw new Error("Unkown token");
};

export default getNextToken;
