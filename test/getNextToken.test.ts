import getNextToken from "../lib/getNextToken";
import Token from "../lib/Token";

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
    const str = "432;"
    let index = 0
    const getNextChar = () => str.charAt(index)
    const doneWithCurrentChar = () => index++
    expect(getNextToken({
      getNextChar,
      doneWithCurrentChar
    })).toStrictEqual({
      token: Token.NUMBER_LITERAL,
      data: 432
    })
    expect(index).toBe(3)
  })

  test.todo('negative number')

  test.todo('decimal number')

  test.todo('hexadecimal number')

  test.todo('binary number')
})
