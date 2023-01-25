import GetIdentifierDefinitions from '../../nodeFns/GetIdentifierDefinitions'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'

const getIdentifierDefinitions: GetIdentifierDefinitions<CoreNodeDatas[CoreNodeType.DECLARE]> = (
  { name }
) => [{
  index: [1],
  node: name
}]

export default getIdentifierDefinitions
