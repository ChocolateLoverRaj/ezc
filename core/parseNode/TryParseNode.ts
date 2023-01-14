import CoreTokenWithData from '../CoreTokenWithData'
import EnumItemWithData from '../EnumItemWithData'
import ParsedNode from './ParsedNode'

type TryParseNode<T extends EnumItemWithData> = (
  stream: AsyncIterable<CoreTokenWithData>
) => Promise<ParsedNode<T> | undefined>

export default TryParseNode
