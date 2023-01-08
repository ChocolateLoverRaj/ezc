import unparseVoidType from '../unparseVoidType'

test('void', () => {
  expect(unparseVoidType(undefined)).toMatchSnapshot()
})
