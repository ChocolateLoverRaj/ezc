import EnumItemWithData from '../EnumItemWithData'
import UnparseNode from '../unparseNode/UnparseNode'
import Check from './check/Check'
import GetIdentifierDefinitions from './GetIdentifierDefinitions'

interface NodeFns<T extends EnumItemWithData> {
  unparse: UnparseNode<T['data']>
  getIdentifierDefinitions?: GetIdentifierDefinitions<T['data']>
  check?: Check<T['data']>
}

export default NodeFns
