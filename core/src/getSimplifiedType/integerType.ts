import GetSimplifiedType from '../nodeFns/GetSimplifiedType'
import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import SimplifiedType from '../simplifiedTypes/SimplifiedType'

const getSimplifiedType: GetSimplifiedType<CoreNodeDatas[CoreNodeType.INTEGER_TYPE]> = () => ({
  type: SimplifiedType.NUMBER,
  data: undefined
})

export default getSimplifiedType
