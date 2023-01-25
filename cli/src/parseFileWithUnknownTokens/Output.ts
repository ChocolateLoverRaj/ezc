import CoreNodesWithData from 'ezc/dist/parseNode/CoreNodesWithData'
import CoreNodeType from 'ezc/dist/parseNode/CoreNodeType'
import TryParseNodeResult from 'ezc/dist/parseNode/tryParseNodeResult/TryParseNodeResult'
import TokenLength from '../getStrIndexFromTokenIndex/TokenLength'

interface Output {
  index: number
  parseTokenError: boolean
  parseFileResult: TryParseNodeResult<CoreNodesWithData[CoreNodeType.FILE]>
  tokenLengths: TokenLength[]
}

export default Output
