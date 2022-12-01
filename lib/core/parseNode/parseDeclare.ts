import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseDeclare: TryParseNode<CoreNodesWithData[CoreNodeType.DECLARE]> = async () => {
  return undefined
}

export default parseDeclare
