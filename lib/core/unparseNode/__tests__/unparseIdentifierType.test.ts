import IdentifierType from '../../IdentifierType'
import coreInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseIdentifier from '../unparseIdentifier'

test('%magic', () => {
  expect(unparsedNodeToString(coreInput)(unparseIdentifier({
    name: 'magic',
    type: IdentifierType.PERCENT
  }))).toMatchSnapshot()
})
