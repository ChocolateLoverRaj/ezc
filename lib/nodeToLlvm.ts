import { Value } from 'llvm-bindings'
import Node from './Node'
import NodeType from './NodeType'

const nodeToLlvm = (node: Node) => Value => {
  if (node.type === NodeType.NUMBER_LITERAL) {

  }
}
