import EnumItemWithData from '../../EnumItemWithData'
import UnparsedPartType from '../../unparseNode/UnparsedPartType'
import Input from './Input'
import Output from './Output'
import SubNode from './SubNode'

const getSubNodesRecursive = (input: Input): Output => {
  const getSubNodesWithIndex = (
    index: number[],
    { allNodeFns, node }: Input
  ): Output => {
    return [
      { index, node },
      ...allNodeFns.get(node.type.enum)?.get(node.type.id)?.unparse(node.data)
        .filter(({ type }) => type === UnparsedPartType.NODE)
        .map(({ data }) => data as EnumItemWithData)
        .flatMap((node, currentIndex) =>
          getSubNodesWithIndex([...index, currentIndex], { allNodeFns, node })) as SubNode[]
    ]
  }

  return getSubNodesWithIndex([], input)
}

export default getSubNodesRecursive
