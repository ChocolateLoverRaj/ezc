import IdentifierType from '../../IdentifierType'
import unparseIdentifier from '../unparseIdentifier'

test('@0', () => {
  expect(unparseIdentifier({
    type: IdentifierType.AT,
    name: '0'
  })).toBe('@0')
})

test('Loop:', () => {
  expect(unparseIdentifier({
    type: IdentifierType.BLOCK,
    name: 'Loop'
  })).toBe('Loop:')
})
