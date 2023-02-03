import never from 'never'
import Check from '../../nodeFns/check/Check'
import CoreNodesWithData from '../../parseNode/CoreNodesWithData'
import CoreNodeType from '../../parseNode/CoreNodeType'
import getClosestParentNode from '../getClosestParentNode'

const checkReturnInstruction: Check<CoreNodesWithData[CoreNodeType.RETURN_INSTRUCTION]> = (
  { parentNodes, nodeData }
) => {
  const { returnType } =
  getClosestParentNode<CoreNodesWithData[CoreNodeType.FUNCTION]>(parentNodes, {
    enum: CoreNodeType,
    id: CoreNodeType.FUNCTION
  }) ?? never()
}

export default checkReturnInstruction
