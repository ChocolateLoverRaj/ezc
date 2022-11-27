import TokenWithData from '../TokenWithData'
import Node from './Node'
import ParsedNode from './ParsedNode'

type TryParseNode<T extends Node> = (
  stream: AsyncIterable<TokenWithData>
) => Promise<ParsedNode<T> | undefined>

export default TryParseNode
