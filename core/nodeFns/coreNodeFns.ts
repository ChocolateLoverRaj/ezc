import EnumItemWithData from '../EnumItemWithData'
import CoreNodeType from '../parseNode/CoreNodeType'
import unparseArrayType from '../unparseNode/unparseArrayType'
import unparseAssignmentInstruction from '../unparseNode/unparseAssignmentInstruction'
import unparseBlock from '../unparseNode/unparseBlock'
import unparseCallAssignable from '../unparseNode/unparseCallAssignable'
import unparseDeclare from '../unparseNode/unparseDeclare/unparseDeclare'
import unparseFile from '../unparseNode/unparseFile'
import unparseFloatType from '../unparseNode/unparseFloatType'
import unparseFunction from '../unparseNode/unparseFunction'
import unparseGlobalVariable from '../unparseNode/unparseGlobalVariable'
import unparseIdentifier from '../unparseNode/unparseIdentifier'
import unparseInput from '../unparseNode/unparseInput'
import coreUnparseInputFlagInput from '../unparseNode/unparseInputFlag/coreInput'
import unparseInputFlag from '../unparseNode/unparseInputFlag/unparseInputFlag'
import unparseIntegerType from '../unparseNode/unparseIntegerType'
import unparseNumber from '../unparseNode/unparseNumber'
import unparsePointerType from '../unparseNode/unparsePointerType'
import unparseReturnInstruction from '../unparseNode/unparseReturnInstruction'
import unparseString from '../unparseNode/unparseString'
import unparseStructType from '../unparseNode/unparseStructType'
import unparseVoidType from '../unparseNode/unparseVoidType'
import AllNodeFns from './AllNodeFns'
import NodeFns from './NodeFns'

const coreNodeFns: AllNodeFns = new Map([
  [CoreNodeType, new Map<number, NodeFns<EnumItemWithData>>([
    [CoreNodeType.DECLARE, {
      unparse: unparseDeclare
    }],
    [CoreNodeType.INPUT_FLAG, {
      unparse: unparseInputFlag(coreUnparseInputFlagInput)
    }],
    [CoreNodeType.ARRAY_TYPE, {
      unparse: unparseArrayType
    }],
    [CoreNodeType.FILE, {
      unparse: unparseFile
    }],
    [CoreNodeType.STRING, {
      unparse: unparseString
    }],
    [CoreNodeType.VOID_TYPE, {
      unparse: unparseVoidType
    }],
    [CoreNodeType.INTEGER_TYPE, {
      unparse: unparseIntegerType
    }],
    [CoreNodeType.POINTER_TYPE, {
      unparse: unparsePointerType
    }],
    [CoreNodeType.IDENTIFIER, {
      unparse: unparseIdentifier
    }],
    [CoreNodeType.NUMBER, {
      unparse: unparseNumber
    }],
    [CoreNodeType.FUNCTION, {
      unparse: unparseFunction
    }],
    [CoreNodeType.BLOCK, {
      unparse: unparseBlock
    }],
    [CoreNodeType.RETURN_INSTRUCTION, {
      unparse: unparseReturnInstruction
    }],
    [CoreNodeType.CALL_ASSIGNABLE, {
      unparse: unparseCallAssignable
    }],
    [CoreNodeType.ASSIGNMENT_INSTRUCTION, {
      unparse: unparseAssignmentInstruction
    }],
    [CoreNodeType.GLOBAL_VARIABLE, {
      unparse: unparseGlobalVariable
    }],
    [CoreNodeType.FLOAT_TYPE, {
      unparse: unparseFloatType
    }],
    [CoreNodeType.STRUCT_TYPE, {
      unparse: unparseStructType
    }],
    [CoreNodeType.INPUT, {
      unparse: unparseInput
    }]
  ])]
])

export default coreNodeFns
