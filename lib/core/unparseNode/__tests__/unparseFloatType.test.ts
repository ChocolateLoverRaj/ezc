import FloatType from '../../parseNode/FloatType'
import unparseFloatType from '../unparseFloatType'

test('double', () => {
  expect(unparseFloatType(FloatType.DUOBLE)).toMatchSnapshot()
})
