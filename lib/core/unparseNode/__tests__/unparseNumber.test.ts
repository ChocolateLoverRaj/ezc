import coreInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseNumber from '../unparseNumber'

test('1.2', () => {
  expect(unparsedNodeToString(coreInput)(unparseNumber(1.2))).toMatchSnapshot()
})
