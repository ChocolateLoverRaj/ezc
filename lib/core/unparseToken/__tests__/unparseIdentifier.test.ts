import CoreTokenType from '../../CoreTokenType'
import IdentifierType from '../../IdentifierType'
import unparseIdentifier from '../unparseIdentifier'

test('@0', () => {
  expect(unparseIdentifier({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.IDENTIFIER
    },
    data: {
      type: IdentifierType.AT,
      name: '0'
    }
  })).toBe('@0')
})

test('Loop:', () => {
  expect(unparseIdentifier({
    type: {
      enum: CoreTokenType,
      id: CoreTokenType.IDENTIFIER
    },
    data: {
      type: IdentifierType.BLOCK,
      name: 'Loop'
    }
  })).toBe('Loop:')
})
