import EnumItemWithData from '../EnumItemWithData'
import coreNodeFns from '../nodeFns/coreNodeFns'
import TryParseNode from '../parseNode/TryParseNode'
import stringToTokensStream from './stringToTokensStream'

const testCheckNode = async (
  parseNode: TryParseNode<EnumItemWithData>,
  code: string
): Promise<void> => {
  const { success, result } = await parseNode(stringToTokensStream(code))
  if (!success) throw new Error('Error parsing node')
  const { type, data } = result.node
  expect(coreNodeFns.get(type.enum)?.get(type.id)?.check?.({
    allNodeFns: coreNodeFns,
    nodeData: data,
    parentNodes: []
  })).toMatchSnapshot()
}

export default testCheckNode
