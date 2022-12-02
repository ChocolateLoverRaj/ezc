import EnumItemWithData from '../EnumItemWithData'
import TryParseNode from './TryParseNode'

const tryNodeParsers = (nodeParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>):
TryParseNode<EnumItemWithData> => async stream => {
  for (const typeParser of nodeParsers) {
    const parsedNode = await typeParser(stream)
    if (parsedNode !== undefined) return parsedNode
  }
}

export default tryNodeParsers
