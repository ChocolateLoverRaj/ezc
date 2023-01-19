import CoreNodesWithData from '../../core/parseNode/CoreNodesWithData'
import CoreNodeType from '../../core/parseNode/CoreNodeType'
import TryParseNodeResult from '../../core/parseNode/tryParseNodeResult/TryParseNodeResult'
import TokenLength from '../getStrIndexFromTokenIndex/TokenLength'

interface Output {
  index: number
  parseTokenError: boolean
  parseFileResult: TryParseNodeResult<CoreNodesWithData[CoreNodeType.FILE]>
  tokenLengths: TokenLength[]
}

export default Output
