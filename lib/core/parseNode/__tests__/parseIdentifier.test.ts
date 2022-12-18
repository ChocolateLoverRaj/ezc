import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import IdentifierType from '../../IdentifierType'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
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
  await expect(parseIdentifier(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    '@0'
  ])) as any)).resolves.toEqual(expected)
})
