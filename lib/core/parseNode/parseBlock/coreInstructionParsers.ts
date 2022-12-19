import EnumItemWithData from '../../EnumItemWithData'
import coreInput from '../parseReturnInstruction/coreInput'
import parseReturnInstruction from '../parseReturnInstruction/parseReturnInstruction'
import TryParseNode from '../TryParseNode'

const coreInstructionParsers: ReadonlyArray<TryParseNode<EnumItemWithData>> = [
  parseReturnInstruction(coreInput)
]

export default coreInstructionParsers
