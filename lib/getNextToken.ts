import Token from "./Token";
import Reader from "./Reader";
import TokenWithData from "./TokenWithData";
import digitRegex from './digitRegex'

const getNextToken = ({getNextChar, doneWithCurrentChar}: Reader): TokenWithData => {
  const char = getNextChar();
  if (char === "<") {
    doneWithCurrentChar();
    return { token: Token.RETURN };
  }
  if (char === ";") {
    doneWithCurrentChar();
    return { token: Token.SEMICOLON };
  }
  if (char === "(") {
    doneWithCurrentChar();
    return { token: Token.PARENTHESIS_OPEN };
  }
  if (char === ")") {
    doneWithCurrentChar();
    return { token: Token.PARENTHESIS_CLOSE };
  }
  if (digitRegex.test(char)) {
    let numberLiteral = char;
    doneWithCurrentChar()
    {
      let char: string;
      while (digitRegex.test((char = getNextChar()))) {
        numberLiteral += char;
        doneWithCurrentChar();
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
    while ((char = getNextChar()) !== "") {
      stringLiteral += char;
      doneWithCurrentChar();
    }
    doneWithCurrentChar();
    return {
      token: Token.STRING_LITERAL,
      data: stringLiteral
    };
  }
  throw new Error("Unkown token");
};

export default getNextToken;
