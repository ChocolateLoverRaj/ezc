import CoreTokenWithData from '../../CoreTokenWithData'
import EnumItemWithData from '../../EnumItemWithData'
import TryParseNode from '../TryParseNode'
import ParsedNodeError from '../ParseNodeError'
import EnumItem from '../../EnumItem'
import Output from './Output'

const tryNodeParsers = (
  nodeParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
) => async (stream: AsyncIterable<CoreTokenWithData>): Promise<Output> => {
  const errors: Array<ParsedNodeError<EnumItem>> = []
  for (const typeParser of nodeParsers) {
    const { success, result } = await typeParser(stream)
    if (success) {
      return {
        success: true,
        result
      }
    } else {
      errors.push(result)
    }
  }
  return {
    success: false,
    result: errors
  }
}

export default tryNodeParsers
