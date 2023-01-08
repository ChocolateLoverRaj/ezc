import unparseString from '../unparseString'

test('hi', () => {
  expect(unparseString('hi')).toMatchSnapshot()
})
