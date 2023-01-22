import GetIdentifierDefinitions from '../../nodeFns/GetIdentifierDefinitions'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'

const getIdentifierDefinitions: GetIdentifierDefinitions<CoreNodeDatas[CoreNodeType.FUNCTION]> = (
  { name }
) => [{
  index: 1,
  node: name
}]

export default getIdentifierDefinitions
