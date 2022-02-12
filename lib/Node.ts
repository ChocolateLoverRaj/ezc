import NodeType from "./NodeType"

interface NodeDataMappings {
  [NodeType.FUNCTION]: number
}

type HiddenInterface = {
  [K in keyof NodeDataMappings]: {
    type: K;
    data: NodeDataMappings[K];
  };
} &
  {
    [K in NodeType]: {
      type: K;
    };
  };

type Node = HiddenInterface[keyof HiddenInterface];

export default Node;
