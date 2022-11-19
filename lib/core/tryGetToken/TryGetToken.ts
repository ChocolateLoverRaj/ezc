import TokenWithData from '../TokenWithData'
import ParsedToken from './ParsedToken'

type TryGetToken<T extends TokenWithData> =
  (stream: AsyncIterable<string>) => Promise<ParsedToken<T> | undefined>

export default TryGetToken
