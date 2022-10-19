import InputController from './InputController'
import TokenType from './TokenType'
import TokenWithData from './TokenWithData'

const parseStringLiteral = async (
  { get, free }: InputController
): Promise<TokenWithData[TokenType.STRING_LITERAL] | undefined> => {
  for await (const char of get(1)) {
    if (char === 'c') {
      for await (const char of get(1)) {
        if (char === '"') {
          let string = ''
          for await (const char of get(Infinity)) {
            // No \ escaping stuff yet
            if (char === '"') {
              return string
            }
            string += char
          }
        }
      }
    }
  }
}

export default parseStringLiteral
