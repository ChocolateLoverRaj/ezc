import CoreNodeType from '../parseNode/CoreNodeType'
import unparseArrayType from '../unparseNode/unparseArrayType'
import unparseAssignmentIntruction from '../unparseNode/unparseAssignmentInstruction'
import unparseBlock from '../unparseNode/unparseBlock'
import unparseCallAssignable from '../unparseNode/unparseCallAssignable'
import unparseDeclare from '../unparseNode/unparseDeclare/unparseDeclare'
import unparseFile from '../unparseNode/unparseFile'
import unparseFloatType from '../unparseNode/unparseFloatType'
import unparseFunction from '../unparseNode/unparseFunction'
import unparseGlobalVariable from '../unparseNode/unparseGlobalVariable'
import unparseIdentifier from '../unparseNode/unparseIdentifier'
import coreUnparseInputFlagInput from '../unparseNode/unparseInputFlag/coreInput'
import unparseInputFlag from '../unparseNode/unparseInputFlag/unparseInputFlag'
import unparseIntegerType from '../unparseNode/unparseIntegerType'
import UnparseNode from '../unparseNode/UnparseNode'
import unparseNumber from '../unparseNode/unparseNumber'
import unparsePointerType from '../unparseNode/unparsePointerType'
import unparseReturnInstruction from '../unparseNode/unparseReturnInstruction'
import unparseString from '../unparseNode/unparseString'
import unparseStructType from '../unparseNode/unparseStructType'
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
    [CoreNodeType.POINTER_TYPE, unparsePointerType],
    [CoreNodeType.IDENTIFIER, unparseIdentifier],
    [CoreNodeType.NUMBER, unparseNumber],
    [CoreNodeType.FUNCTION, unparseFunction],
    [CoreNodeType.BLOCK, unparseBlock],
    [CoreNodeType.RETURN_INSTRUCTION, unparseReturnInstruction],
    [CoreNodeType.CALL_ASSIGNABLE, unparseCallAssignable],
    [CoreNodeType.ASSIGNMENT_INSTRUCTION, unparseAssignmentIntruction],
    [CoreNodeType.GLOBAL_VARIABLE, unparseGlobalVariable],
    [CoreNodeType.FLOAT_TYPE, unparseFloatType],
    [CoreNodeType.STRUCT_TYPE, unparseStructType]
  ])]
])

export default coreNodeUnparsers
