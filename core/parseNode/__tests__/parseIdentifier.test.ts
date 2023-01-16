import IdentifierType from '../../IdentifierType'
import CoreNodeType from '../CoreNodeType'
import parseIdentifier from '../parseIdentifier'
import testParseNode from '../testParseNode'

test('@0', async () => {
  await testParseNode(parseIdentifier, '@0', {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.IDENTIFIER
      },
      data: {
        type: IdentifierType.AT,
        name: '0'
      }
    },
    length: 1
  })
})
