import CoreTokenWithData from '../CoreTokenWithData'
import Node from './Node'
import ParsedNode from './ParsedNode'

type TryParseNode<T extends Node> = (
  stream: AsyncIterable<CoreTokenWithData>
) => Promise<ParsedNode<T> | undefined>

export default TryParseNode
