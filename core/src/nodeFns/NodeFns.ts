import EnumItemWithData from '../EnumItemWithData'
import UnparseNode from '../unparseNode/UnparseNode'
import Check from './check/Check'
import GetIdentifierDefinitions from './GetIdentifierDefinitions'
import GetMatchingTypes from './GetMatchingTypes'
import GetSimplifiedType from './GetSimplifiedType'

interface NodeFns<T extends EnumItemWithData> {
  unparse: UnparseNode<T['data']>
  getIdentifierDefinitions?: GetIdentifierDefinitions<T['data']>
  check?: Check<T['data']>
  getMatchingTypes?: GetMatchingTypes<T['data']>
  getSimplifiedType?: GetSimplifiedType<T['data']>
}

export default NodeFns
