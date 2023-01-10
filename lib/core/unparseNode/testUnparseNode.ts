import TryParseNode from '../parseNode/TryParseNode'
import EnumItemWithData from '../EnumItemWithData'
import UnparsedPartType from './UnparsedPartType'
import unparsedNodeToString from '../unparsedNodeToString/unparsedNodeToString'
import coreInput from '../unparsedNodeToString/coreInput'
import parseAllTokens from '../tryGetToken/parseAllTokens'
import coreTryers from '../tryGetToken/coreTryers'
import arrayToAsyncIterable from '../arrayToAsyncIterable'

const testUnparseNode = async (
  parseNode: TryParseNode<EnumItemWithData>,
  code: string
): Promise<void> => {
  expect(unparsedNodeToString(coreInput)([{
    type: UnparsedPartType.NODE,
    data: (await parseNode(
      parseAllTokens(coreTryers)(
        arrayToAsyncIterable([code])) as any))?.node as EnumItemWithData
  }])).toMatchSnapshot()
}

export default testUnparseNode
