import getNextToken from "../lib/getNextToken";
import Token from "../lib/Token";
import tokenFromString from '../test-lib/tokenFromString'

test("<", () => {
  const getNextChar = jest.fn(() => "<");
  const doneWithCurrentChar = jest.fn();
  expect(
    getNextToken({
      getNextChar,
      doneWithCurrentChar
    })
  ).toStrictEqual({
    token: Token.RETURN
  });
  expect(doneWithCurrentChar).toBeCalledTimes(1)
});

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