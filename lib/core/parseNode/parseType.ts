import CoreNodeDatas from './CoreNodeDatas'
import CoreNodeType from './CoreNodeType'
import TryParseNode from './TryParseNode'
import TypeParser from './TypeParser'

const parseType = (typeParsers: readonly TypeParser[]):
TryParseNode<any> => async stream => {
  for (const typeParser of typeParsers) {
    const parsedNode = await typeParser(stream)
    if (parsedNode !== undefined) return parsedNode
  }
}

export default parseType
