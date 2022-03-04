import getNextNode from '../getNextNode'
import Node from '../Node'
import NodeType from '../NodeType'
import { getReader, initialize } from '../reader-from-array'
import Token from '../Token'
import TokenWithData from '../TokenWithData'

test('< 3', () => {
  const data = initialize<TokenWithData>([{
    token: Token.ARROW_LEFT
  }, {
    token: Token.NUMBER_LITERAL,
    data: 3
  }])
  const node = getNextNode(getReader(data))
  expect(node).toStrictEqual<Node>({
    type: NodeType.RETURN,
    data: {
      type: NodeType.NUMBER_LITERAL,
      data: 3
    }
  })
  expect(data.index).toBe(2)
})

test('<', () => {
  const data = initialize<TokenWithData>([{
    token: Token.ARROW_LEFT
  }])
  expect(() => getNextNode(getReader(data))).toThrowErrorMatchingSnapshot()
})

test('< <', () => {
  const data = initialize<TokenWithData>([{
    token: Token.ARROW_LEFT
  }, {
    token: Token.ARROW_LEFT
  }])
  expect(() => getNextNode(getReader(data))).toThrowErrorMatchingSnapshot()
})

test('int32 n', () => {
  const data = initialize<TokenWithData>([{
    token: Token.INT32
  }, {
    token: Token.IDENTIFIER,
    data: 'n'
  }])
  const node = getNextNode(getReader(data))
  expect(node).toStrictEqual<Node>({
    type: NodeType.VARIABLE_INITIALIZE,
    data: {
      type: Token.INT32,
      variableIdentifier: 'n',
      initializedValue: undefined
    }
  })
  expect(data.index).toBe(2)
})

test('int32 n = 1', () => {
  const data = initialize<TokenWithData>([{
    token: Token.INT32
  }, {
    token: Token.IDENTIFIER,
    data: 'n'
  }, {
    token: Token.ASSIGNMENT
  }, {
    token: Token.NUMBER_LITERAL,
    data: 1
  }])
  const node = getNextNode(getReader(data))
  expect(node).toStrictEqual<Node>({
    type: NodeType.VARIABLE_INITIALIZE,
    data: {
      type: Token.INT32,
      variableIdentifier: 'n',
      initializedValue: {
        type: NodeType.NUMBER_LITERAL,
        data: 1
      }
    }
  })
  expect(data.index).toBe(4)
})

test('() > 234', () => {
  const data = initialize<TokenWithData>([{
    token: Token.PARENTHESIS_OPEN
  }, {
    token: Token.PARENTHESIS_CLOSE
  }, {
    token: Token.ARROW_RIGHT
  }, {
    token: Token.NUMBER_LITERAL,
    data: 234
  }])
  const node = getNextNode(getReader(data))
  expect(node).toStrictEqual<Node>({
    type: NodeType.FUNCTION,
    data: {
      inputs: [],
      inside: [{
        type: NodeType.RETURN,
        data: {
          type: NodeType.NUMBER_LITERAL,
          data: 234
        }
      }]
    }
  })
  expect(data.index).toBe(4)
})

test.todo('() > { return 3 }')
