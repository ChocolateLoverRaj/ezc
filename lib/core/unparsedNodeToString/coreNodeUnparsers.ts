import CoreNodeType from '../parseNode/CoreNodeType'
import unparseArrayType from '../unparseNode/unparseArrayType'
import unparseDeclare from '../unparseNode/unparseDeclare/unparseDeclare'
import unparseFile from '../unparseNode/unparseFile'
import coreUnparseInputFlagInput from '../unparseNode/unparseInputFlag/coreInput'
import unparseInputFlag from '../unparseNode/unparseInputFlag/unparseInputFlag'
import unparseIntegerType from '../unparseNode/unparseIntegerType'
import UnparseNode from '../unparseNode/UnparseNode'
import unparsePointerType from '../unparseNode/unparsePointerType'
import unparseString from '../unparseNode/unparseString'
import unparseVoidType from '../unparseNode/unparseVoidType'
import NodeUnparsers from './NodeUnparsers'

const coreNodeUnparsers: NodeUnparsers = new Map([
  [CoreNodeType, new Map<number, UnparseNode<unknown>>([
    [CoreNodeType.DECLARE, unparseDeclare],
    [CoreNodeType.INPUT_FLAG, unparseInputFlag(coreUnparseInputFlagInput)],
    [CoreNodeType.ARRAY_TYPE, unparseArrayType],
    [CoreNodeType.FILE, unparseFile],
    [CoreNodeType.STRING, unparseString],
    [CoreNodeType.VOID_TYPE, unparseVoidType],
    [CoreNodeType.INTEGER_TYPE, unparseIntegerType],
    [CoreNodeType.POINTER_TYPE, unparsePointerType]
  ])]
])

export default coreNodeUnparsers
