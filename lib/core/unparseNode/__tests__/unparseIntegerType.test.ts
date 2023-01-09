import unparseIntegerType from '../unparseIntegerType'

test('i8', () => {
  expect(unparseIntegerType(8)).toMatchSnapshot()
})
