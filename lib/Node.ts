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
}

type HiddenInterface = {
  [K in keyof NodeDataMappings]: {
    type: K
    data: NodeDataMappings[K]
  };
} &
{
  [K in NodeType]: {
    type: K
  };
}

type Node = HiddenInterface[keyof HiddenInterface]

export default Node
