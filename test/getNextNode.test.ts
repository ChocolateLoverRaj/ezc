import getNextNode from '../lib/getNextNode'
import Node from '../lib/Node'
import NodeType from '../lib/NodeType'
import { getReader, initialize } from '../lib/reader-from-array'
import Token from '../lib/Token'
import TokenWithData from '../lib/TokenWithData'

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

test('int n', () => {
  const data = initialize<TokenWithData>([{
    token: Token.INT
  }, {
    token: Token.IDENTIFIER,
    data: 'n'
  }])
  const node = getNextNode(getReader(data))
  expect(node).toStrictEqual<Node>({
    type: NodeType.VARIABLE_INITIALIZE,
    data: {
      type: Token.INT,
      variableIdentifier: 'n',
      initializedValue: undefined
    }
  })
  expect(data.index).toBe(2)
})

test('int n = 1', () => {
  const data = initialize<TokenWithData>([{
    token: Token.INT
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
      type: Token.INT,
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
