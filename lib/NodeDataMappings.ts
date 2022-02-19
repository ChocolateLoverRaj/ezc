import Node from './Node'
import NodeByType from './NodeByType'
import NodeType from './NodeType'
import TypeToken from './TypeToken'

interface NodeDataMappings {
  [NodeType.NUMBER_LITERAL]: number
  [NodeType.RETURN]: Node
  [NodeType.VARIABLE_INITIALIZE]: {
    /**
     * Is it `int`, `double`, `float`, `auto`?
     */
    type: TypeToken
    /**
     * Example code: `int n`. `n` is this
     */
    variableIdentifier: string
    /**
     * Example: `int n = 1`. `1` is this
     */
    initializedValue?: Node
  }
  [NodeType.FUNCTION]: {
    inputs: Array<NodeByType[NodeType.INPUT]>
    inside: Node[]
  }
  [NodeType.INPUT]: {
    type: TypeToken
    identifier: string
  }
}

export default NodeDataMappings
