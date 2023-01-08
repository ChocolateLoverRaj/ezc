import CoreInputFlag from '../../../parseNode/CoreInputFlag'
import coreInput from '../coreInput'
import unparseInputFlag from '../unparseInputFlag'

test('nofree', () => {
  expect(unparseInputFlag(coreInput)({
    enum: CoreInputFlag,
    id: CoreInputFlag.NO_FREE
  })).toMatchSnapshot()
})
