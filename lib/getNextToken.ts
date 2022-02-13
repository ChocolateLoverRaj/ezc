import Token from './Token'
import Reader from './Reader'
import TokenWithData from './TokenWithData'
import digitRegex from './digitRegex'
import never from 'never'
import identifierNextCharsRegex from './identifierNextCharsRegex'
import identifierFirstCharRegex from './identifierFirstCharRegex'

const getCurrentToken = (
  {
    getCurrent,
    next
  }: Reader<string>
): TokenWithData => {
  const char = getCurrent() ?? never('No char')
  if (char === '<') {
    next()
    return { token: Token.RETURN }
  }
  if (char === ';') {
    next()
    return { token: Token.SEMICOLON }
  }
  if (char === '(') {
    next()
    return { token: Token.PARENTHESIS_OPEN }
  }
  if (char === ')') {
    next()
    return { token: Token.PARENTHESIS_CLOSE }
  }
  if (digitRegex.test(char)) {
    let numberLiteral = char
    next()
    {
      let char: string = ''
      while (((): boolean => {
        const current = getCurrent()
        if (current === undefined) return false
        return digitRegex.test(char = current)
      })()) {
        numberLiteral += char
        next()
      }
    }
    return {
      token: Token.NUMBER_LITERAL,
      data: parseInt(numberLiteral, 10)
    }
  }
  if (char === '"') {
    next()
    let stringLiteral = ''
    let char: string
    // FIXME: use \ to escape
    while ((char = getCurrent() ?? never('No closing " for string')) !== '"') {
      stringLiteral += char
      next()
    }
    next()
    return {
      token: Token.STRING_LITERAL,
      data: stringLiteral
    }
  }
  if (identifierFirstCharRegex.test(char)) {
    let identifierName = char
    next()
    {
      let char: string = ''
      while ((() => {
        const current = getCurrent()
        if (current === undefined) return false
        return identifierNextCharsRegex.test(char = current)
      })()) {
        identifierName += char
        next()
      }
    }
    return {
      token: Token.IDENTIFIER,
      data: identifierName
    }
  }
  throw new Error('Unknown token')
}

export default getCurrentToken
