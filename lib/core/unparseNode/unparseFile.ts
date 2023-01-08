import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparseNode from './UnparseNode'
import { knit } from '@selrond/knit'
import UnparsedPartType from './UnparsedPartType'

const unparseFile: UnparseNode<CoreNodeDatas[CoreNodeType.FILE]> = nodes => knit(nodes, {
  type: UnparsedPartType.NEW_LINE,
  data: undefined
})

export default unparseFile
