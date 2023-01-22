import EnumItemWithData from '../EnumItemWithData'
import UnparseNode from '../unparseNode/UnparseNode'
import GetIdentifierDefinitions from './GetIdentifierDefinitions'

interface NodeFns<T extends EnumItemWithData> {
  unparse: UnparseNode<T['data']>
  getIdentifierDefinitions?: GetIdentifierDefinitions<T['data']>
}

export default NodeFns
