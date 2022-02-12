import Token from "./Token";
import Reader from "./Reader";
import TokenWithData from "./TokenWithData";
import digitRegex from './digitRegex'

const getCurrentToken = (
  {
    getCurrent, 
    next
  }: Reader<string>
): TokenWithData => {
  const char = getCurrent();
  if (char === "<") {
    next();
    return { token: Token.RETURN };
  }
  if (char === ";") {
    next();
    return { token: Token.SEMICOLON };
  }
  if (char === "(") {
    next();
    return { token: Token.PARENTHESIS_OPEN };
  }
  if (char === ")") {
    next();
    return { token: Token.PARENTHESIS_CLOSE };
  }
  if (digitRegex.test(char)) {
    let numberLiteral = char;
    next()
    {
      let char: string;
      while (digitRegex.test((char = getCurrent()))) {
        numberLiteral += char;
        next();
      }
    }
    return {
      token: Token.NUMBER_LITERAL,
      data: parseInt(numberLiteral, 10)
    };
  }
  if (char === '"') {
    next()
    let stringLiteral = "";
    let char: string;
    // FIXME: use \ to escape
    while ((char = getCurrent()) !== '"') {
      stringLiteral += char;
      next();
    }
    next();
    return {
      token: Token.STRING_LITERAL,
      data: stringLiteral
    };
  }
  throw new Error("Unkown token");
};

export default getCurrentToken;
