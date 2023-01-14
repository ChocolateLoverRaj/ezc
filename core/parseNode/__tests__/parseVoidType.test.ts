import arrayToAsyncIterable from '../../../util/arrayToAsyncIterable/arrayToAsyncIterable'
import EnumItemWithData from '../../EnumItemWithData'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import ParsedNode from '../ParsedNode'
import parseVoidType from '../parseVoidType'

test('void', async () => {
  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.VOID_TYPE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.VOID_TYPE
      },
      data: undefined
    },
    length: 1
  }
  await expect(parseVoidType(
    parseAllTokens(coreTryers)(arrayToAsyncIterable(['void'])) as AsyncIterable<EnumItemWithData>
  )).resolves.toEqual(expected)
})
