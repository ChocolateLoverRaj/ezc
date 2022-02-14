import NodeDataMappings from './NodeDataMappings'
import NodeType from './NodeType'

type NodeByType = {
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

export default NodeByType
