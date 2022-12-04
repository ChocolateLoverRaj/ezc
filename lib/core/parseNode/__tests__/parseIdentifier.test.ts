import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import IdentifierType from '../../IdentifierType'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parseIdentifier from '../parseIdentifier'

test('@0', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.IDENTIFIER]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.IDENTIFIER
      },
      data: {
        type: IdentifierType.AT,
        name: '0'
      }
    },
    length: 1
  }
  await expect(parseIdentifier({
    async * [Symbol.asyncIterator] () {
      const token: CoreTokensWithData[CoreTokenType.IDENTIFIER] = {
        type: {
          enum: CoreTokenType,
          id: CoreTokenType.IDENTIFIER
        },
        data: {
          type: IdentifierType.AT,
          name: '0'
        }
      }
      yield token
    }
  })).resolves.toEqual(expected)
})
