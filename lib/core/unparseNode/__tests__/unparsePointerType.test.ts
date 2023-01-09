import unparsePointerType from '../unparsePointerType'

test('ptr', () => {
  expect(unparsePointerType(undefined)).toMatchSnapshot()
})
