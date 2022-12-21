import EnumItemWithData from '../../EnumItemWithData'
import parseAssignmentInstruction from '../parseAssignmentInstruction/parseAssignmentInstruction'
import coreParseReturnInstructionInput from '../parseReturnInstruction/coreInput'
import parseReturnInstruction from '../parseReturnInstruction/parseReturnInstruction'
import TryParseNode from '../TryParseNode'
import coreParseAssignmentInstructionInput from '../parseAssignmentInstruction/coreInput'
import parseCallAssignable from '../parseCallAssignable/parseCallAssignable'
import coreParseCallAssignableInput from '../parseCallAssignable/coreInput'

const coreInstructionParsers: ReadonlyArray<TryParseNode<EnumItemWithData>> = [
  parseReturnInstruction(coreParseReturnInstructionInput),
  parseAssignmentInstruction(coreParseAssignmentInstructionInput),
  parseCallAssignable(coreParseCallAssignableInput)
]

export default coreInstructionParsers
