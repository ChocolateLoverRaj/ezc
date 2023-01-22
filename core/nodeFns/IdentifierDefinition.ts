import CoreNodesWithData from '../parseNode/CoreNodesWithData'
import CoreNodeType from '../parseNode/CoreNodeType'

interface IdentifierDefinition {
  index: number
  node: CoreNodesWithData[CoreNodeType.IDENTIFIER]
}

export default IdentifierDefinition
