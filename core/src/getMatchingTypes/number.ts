import GetMatchingTypes from '../nodeFns/GetMatchingTypes'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import SimplifiedType from '../simplifiedTypes/SimplifiedType'

const getMatchingTypes: GetMatchingTypes<CoreNodeDatas[CoreNodeType.NUMBER]> = ({ floatType }) => [{
  type: SimplifiedType.NUMBER,
  data: floatType
}]

export default getMatchingTypes
