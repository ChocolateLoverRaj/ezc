import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparseNode from './UnparseNode'
import { knit } from '@selrond/knit'
import UnparsedPartType from './UnparsedPartType'
import UnparsedPart from './UnparsedPart'

const unparseFile: UnparseNode<CoreNodeDatas[CoreNodeType.FILE]> = nodes =>
  knit<UnparsedPart>(nodes.map(node => ({
    type: UnparsedPartType.NODE,
    data: node
  })), {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  })

export default unparseFile
