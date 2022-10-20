import ParsedToken from './ParsedToken'

type TryGetToken = (stream: AsyncIterable<string>) => Promise<ParsedToken | undefined>

export default TryGetToken
