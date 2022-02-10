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
});
