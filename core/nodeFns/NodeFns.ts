import EnumItemWithData from '../EnumItemWithData'
import UnparseNode from '../unparseNode/UnparseNode'

interface NodeFns<T extends EnumItemWithData> {
  unparse: UnparseNode<T['data']>
}

export default NodeFns
