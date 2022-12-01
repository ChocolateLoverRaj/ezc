import CoreNodeDatas from './CoreNodeDatas'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

type TypeParser = TryParseNode<CoreNodeDatas[CoreNodeType.TYPE]>

export default TypeParser
