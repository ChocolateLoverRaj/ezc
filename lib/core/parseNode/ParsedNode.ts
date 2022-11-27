import Node from './Node'

interface ParsedNode<T extends Node> {
  node: T
  length: number
}

export default ParsedNode
