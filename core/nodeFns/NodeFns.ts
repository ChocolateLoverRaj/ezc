import EnumItemWithData from '../EnumItemWithData'
import UnparseNode from '../unparseNode/UnparseNode'
import GetSubNodes from './GetSubNodes'

interface NodeFns<T extends EnumItemWithData> {
  unparse: UnparseNode<T['data']>
  getSubNodes?: GetSubNodes<T['data']>
}

export default NodeFns
