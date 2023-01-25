import splitAsyncIterator from 'util/dist/splitAsyncIterator/splitAsyncIterator.js'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import skipSplittedAsyncIterator from 'util/dist/splitAsyncIterator/skip.js'
import Input from './Input'
import EnumItemWithData from '../../EnumItemWithData'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'

const parseFile = (subNodeParsers: Input): TryParseNode<CoreNodesWithData[CoreNodeType.FILE]> =>
  async stream => {
    const type = {
      enum: CoreNodeType,
      id: CoreNodeType.FILE
    }
    const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
    let length = 0
    const skip = (count: number): void => {
      skipSplittedAsyncIterator(splittedIterator, count)
      length += count
    }
    const nodes: EnumItemWithData[] = []
    while (true) {
      const parseNodeResult = await tryNodeParsers(subNodeParsers)(splittedIterator.asyncIterable)
      if (!parseNodeResult.success) {
        // Return undefined if there is a token which can't be parsed
        const { done } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
        if (done === true) break
        else {
          return {
            success: false,
            result: {
              type,
              index: length,
              message: "Couldn't parse any sub-node",
              subAttempts: parseNodeResult.result
            }
          }
        }
      }
      nodes.push(parseNodeResult.result.node)
      skip(parseNodeResult.result.length)
    }

    return {
      success: true,
      result: {
        node: {
          type,
          data: nodes
        },
        length
      }
    }
  }

export default parseFile
