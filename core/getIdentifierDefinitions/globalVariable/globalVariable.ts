import GetIdentifierDefinitions from '../../nodeFns/GetIdentifierDefinitions'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'

const getIdentifierDefinitions:
GetIdentifierDefinitions<CoreNodeDatas[CoreNodeType.GLOBAL_VARIABLE]> = (
  { identifier }
) => [{
  index: 0,
  node: identifier
}]

export default getIdentifierDefinitions
