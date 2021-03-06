import getNextToken from '../getNextToken'
import Token from '../Token'
import tokenFromString from '../../test-lib/tokenFromString'

test('<', () => {
  const getCurrent = jest.fn(() => '<')
  const next = jest.fn()
  expect(
    getNextToken({
      getCurrent,
      next
    })
  ).toStrictEqual({
    token: Token.ARROW_LEFT
  })
  expect(next).toBeCalledTimes(1)
})

describe('number literal', () => {
  test('whole number', () => {
    tokenFromString('432;', {
      token: Token.NUMBER_LITERAL,
      data: 432
    }, 3)
  })

  test.todo('negative number')

  test.todo('decimal number')

  test.todo('hexadecimal number')

  test.todo('binary number')
})

describe('string literal', () => {
  test('normal', () => {
    tokenFromString('"abc";', {
      token: Token.STRING_LITERAL,
      data: 'abc'
    }, 5)
  })
})

test('identifier', () => {
  tokenFromString('myVariable', {
    token: Token.IDENTIFIER,
    data: 'myVariable'
  }, 'myVariable'.length)
})
