import NodeType from './NodeType'

const expressionNodeTypes: readonly NodeType[] = [
  NodeType.NUMBER_LITERAL,
  NodeType.FUNCTION_CALL
] as const

export default expressionNodeTypes
