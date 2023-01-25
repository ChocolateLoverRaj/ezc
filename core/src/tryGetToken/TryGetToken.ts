import EnumItemWithData from '../EnumItemWithData'
import ParsedToken from './ParsedToken'

type TryGetToken<T extends EnumItemWithData> =
  (stream: AsyncIterable<string>) => Promise<ParsedToken<T> | undefined>

export default TryGetToken
