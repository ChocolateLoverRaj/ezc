import CoreKeyWord from '../CoreKeyWord'
import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokensWithData from '../CoreTokensWithData'
import CoreTokenType from '../CoreTokenType'
import IdentifierType from '../IdentifierType'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'

const parseIdentifier: TryParseNode<CoreNodesWithData[CoreNodeType.IDENTIFIER]> = async stream => {
  const asyncIterator = stream[Symbol.asyncIterator]()

  const type = await (async () => {
    const { done, value } = await asyncIterator.next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (data.enum !== CoreKeyWord) return
    switch (data.id) {
      case CoreKeyWord.PERCENT:
        return IdentifierType.PERCENT
      case CoreKeyWord.AT:
        return IdentifierType.AT
    }
  })()
  console.log('type', type)
  if (type === undefined) return

  const name = await (async () => {
    const { done, value } = await asyncIterator.next()
    if (done === true) return
    // FIXME: This is a number literal instead of an identifier
    console.log('value', value, value.type.enum === CoreTokenType && value.type.id === CoreTokenType.IDENTIFIER)
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.IDENTIFIER)) return
    const name = value.data as CoreTokenDatas[CoreTokenType.IDENTIFIER]
    return name
  })()
  console.log('name', name)
  if (name === undefined) return

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.IDENTIFIER
      },
      data: {
        name,
        type
      }
    },
    length: 1
  }
}

export default parseIdentifier
