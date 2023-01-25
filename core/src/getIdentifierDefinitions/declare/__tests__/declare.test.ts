import coreInput from '../../../parseNode/parseDeclare/coreInput'
import parseDeclare from '../../../parseNode/parseDeclare/parseDeclare'
import testGetIdentifierDefinitions from '../../testGetIdentifierDefinitions'

test('declare i1 @isOdd(i32)', async () => {
  await testGetIdentifierDefinitions(
    parseDeclare(coreInput),
    'declare i1 @isOdd(i32)')
})
