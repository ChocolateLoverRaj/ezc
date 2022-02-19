import Reader from './Reader'
import TokenWithData from './TokenWithData'
import Node from './Node'
import Token from './Token'
import NodeType from './NodeType'
import never from 'never'
import typeTokens from './typeTokens'
import TypeToken from './TypeToken'
import NodeByType from './NodeByType'

const getNextNode = (
  reader: Reader<TokenWithData>,
  mustBeExpression = false
): Node => {
  const {
    getCurrent,
    next
  } = reader
  const tokenWithData = getCurrent() ?? never('No token')
  if (!mustBeExpression && tokenWithData.token === Token.ARROW_LEFT) {
    next()
    return {
      type: NodeType.RETURN,
      data: getNextNode(reader, true)
    }
  }
  if (tokenWithData.token === Token.NUMBER_LITERAL) {
    next()
    return {
      type: NodeType.NUMBER_LITERAL,
      data: tokenWithData.data
    }
  }
  if (typeTokens.includes(tokenWithData.token)) {
    next()
    const identifierToken = getCurrent()
    if (identifierToken?.token !== Token.IDENTIFIER) {
      throw new Error('No identifier after type')
    }
    next()
    const initializedValue = (() => {
      const assignmentToken = getCurrent()
      if (assignmentToken?.token === Token.ASSIGNMENT) {
        next()
        return getNextNode(reader, true)
      }
    })()
    return {
      type: NodeType.VARIABLE_INITIALIZE,
      data: {
        type: tokenWithData.token as TypeToken,
        variableIdentifier: identifierToken.data,
        initializedValue
      }
    }
  }
  if (tokenWithData.token === Token.PARENTHESIS_OPEN) {
    next()
    const nextToken = getCurrent() ?? never('No token after (')
    if (typeTokens.includes(nextToken.token) || nextToken.token === Token.PARENTHESIS_CLOSE) {
      const inputs: Array<NodeByType[NodeType.INPUT]> = []
      if (nextToken.token === Token.PARENTHESIS_CLOSE) {
        next()
      } else {
        while (true) {
          const typeToken = getCurrent() ?? never('No token after start of input list')
          next()
          if (!typeTokens.includes(typeToken.token)) {
            throw new Error('Not type')
          }
          const identifierToken = getCurrent()
          next()
          if (identifierToken?.token !== Token.IDENTIFIER) {
            throw new Error('Not identifier')
          }
          inputs.push({
            type: NodeType.INPUT,
            data: {
              type: typeToken.token,
              identifier: identifierToken.data
            }
          })
          const nextToken = getCurrent() ?? never('Unclosed input list')
          next()
          if (nextToken.token === Token.PARENTHESIS_CLOSE) break
          if (nextToken.token !== Token.COMMA) {
            throw new Error('Bad token')
          }
        }
      }
      {
        const nextToken = getCurrent() ?? never('No token after input list')
        next()
        if (nextToken.token !== Token.ARROW_RIGHT) {
          throw new Error('Not > after input list')
        }
      }
      {
        const nextToken = getCurrent() ?? never('No token after > after input list')
        if (nextToken.token === Token.CURLY_BRACKET_OPEN) {
          throw new Error('Curly bracket function inside not supported yet')
        }
      }
      return {
        type: NodeType.FUNCTION,
        data: {
          inputs,
          inside: [{
            type: NodeType.RETURN,
            data: getNextNode(reader, true)
          }]
        }
      }
    }
    return getNextNode(reader, true)
  }
  throw new Error('Invalid token')
}

export default getNextNode
