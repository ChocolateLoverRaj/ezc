import arrayToAsyncIterable from 'util/dist/arrayToAsyncIterable/arrayToAsyncIterable.js'
import EnumItemWithData from '../EnumItemWithData'
import coreTryers from '../tryGetToken/coreTryers'
import parseAllTokens from '../tryGetToken/parseAllTokens'
import ParsedNode from './ParsedNode'
import TryParseNode from './TryParseNode'
import TryParseNodeResult from './tryParseNodeResult/TryParseNodeResult'

const testParseNode = async <T extends EnumItemWithData>(
  parseNode: TryParseNode<T>,
  string: string,
  expectedResult: ParsedNode<T>
): Promise<void> => {
  const expected: TryParseNodeResult<T> = {
    success: true,
    result: expectedResult
  }
  await expect(parseNode(parseAllTokens(coreTryers)(arrayToAsyncIterable([
    string
  ])) as any)).resolves.toEqual(expected)
}

export default testParseNode
