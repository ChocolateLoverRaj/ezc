import TryParseNode from '../parseNode/TryParseNode'
import EnumItemWithData from '../EnumItemWithData'
import parseAllTokens from '../tryGetToken/parseAllTokens'
import coreTryers from '../tryGetToken/coreTryers'
import arrayToAsyncIterable from 'util/dist/arrayToAsyncIterable/arrayToAsyncIterable.js'
import coreNodeFns from '../nodeFns/coreNodeFns'

const testUnparseNode = async (
  parseNode: TryParseNode<EnumItemWithData>,
  code: string
): Promise<void> => {
  const node = ((await parseNode(
    parseAllTokens(coreTryers)(
      arrayToAsyncIterable([code])) as any))?.result as any).node as EnumItemWithData
  expect(coreNodeFns.get(node.type.enum)?.get(node.type.id)
    ?.getIdentifierDefinitions?.(node.data)).toMatchSnapshot()
}

export default testUnparseNode
