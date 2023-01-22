import coreInput from '../../../parseNode/parseAssignmentInstruction/coreInput'
import parseAssignmentInstruction from
  '../../../parseNode/parseAssignmentInstruction/parseAssignmentInstruction'
import testGetIdentifierDefinitions from '../../testGetIdentifierDefinitions'

test('%var = call i1 @someFn()', async () => {
  await testGetIdentifierDefinitions(
    parseAssignmentInstruction(coreInput),
    '%var = call i1 @someFn()')
})
