import EnumItemWithData from '../EnumItemWithData'
import IdentifierType from '../IdentifierType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import FloatType from './FloatType'
import ConstantOrGlobal from './ConstantOrGlobal'
import Linkage from './Linkage'
import CallAssignableInput from './parseCallAssignable/CallAssignableInput'
import EnumItem from '../EnumItem'

interface CoreNodeDatas {
  [CoreNodeType.FUNCTION]: {
    name: string
    inputs: EnumItemWithData[]
    returnType: EnumItemWithData
    blocks: EnumItemWithData[]
  }
  [CoreNodeType.DECLARE]: {
    name: string
    inputs: EnumItemWithData[]
    returnType: EnumItemWithData
  }
  [CoreNodeType.GLOBAL_VARIABLE]: {
    constantOrGlobal: ConstantOrGlobal
    align: number | undefined
    unnamed_addr: boolean
    linkage: Linkage
    identifier: CoreNodesWithData[CoreNodeType.IDENTIFIER]
    type: EnumItemWithData
    value: EnumItemWithData
  }
  [CoreNodeType.STRING]: string
  [CoreNodeType.INTEGER_TYPE]: number
  [CoreNodeType.FLOAT_TYPE]: FloatType
  [CoreNodeType.POINTER_TYPE]: undefined
  [CoreNodeType.ARRAY_TYPE]: {
    itemsType: EnumItemWithData
    length: number
  }
  [CoreNodeType.STRUCT_TYPE]: EnumItemWithData[]
  [CoreNodeType.IDENTIFIER]: {
    type: IdentifierType
    name: string
  }
  [CoreNodeType.NUMBER]: number
  [CoreNodeType.VOID_TYPE]: undefined
  [CoreNodeType.BLOCK]: {
    name: string
    instructions: EnumItemWithData[]
  }
  [CoreNodeType.RETURN_INSTRUCTION]: {
    type: EnumItemWithData
    value: EnumItemWithData
  }
  [CoreNodeType.FILE]: EnumItemWithData[]
  [CoreNodeType.CALL_ASSIGNABLE]: {
    name: string
    returnType: EnumItemWithData
    inputs: CallAssignableInput[]
  }
  [CoreNodeType.ASSIGNMENT_INSTRUCTION]: {
    identifier: EnumItemWithData
    assignable: EnumItemWithData
  }
  [CoreNodeType.INPUT]: {
    /**
     * The actual type, like `i8` or `ptr`
     */
    type: EnumItemWithData
    flags: EnumItemWithData[]
    identifier: EnumItemWithData | undefined
  }
  [CoreNodeType.INPUT_FLAG]: EnumItem
}

export default CoreNodeDatas
