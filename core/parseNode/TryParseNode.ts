import CoreTokenWithData from '../CoreTokenWithData'
import EnumItemWithData from '../EnumItemWithData'
import TryParseNodeResult from './tryParseNodeResult/TryParseNodeResult'

type TryParseNode<T extends EnumItemWithData> = (
  stream: AsyncIterable<CoreTokenWithData>
) => Promise<TryParseNodeResult<T>>

export default TryParseNode
