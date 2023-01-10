import EnumItemWithData from '../EnumItemWithData'

interface ParsedNode<T extends EnumItemWithData> {
  node: T
  length: number
}

export default ParsedNode
