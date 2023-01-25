import coreInput from '../../../parseNode/parseFunction/coreInput'
import parseFunction from '../../../parseNode/parseFunction/parseFunction'
import testGetIdentifierDefinitions from '../../testGetIdentifierDefinitions'

test('simple function', async () => {
  await testGetIdentifierDefinitions(parseFunction(coreInput),
    `define i1 @main() {
      0:
        ret i1 0
    }`)
})
