import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import skipSplittedAsyncIterator from '../../splitAsyncIterator/skip'
import Input from './Input'
import EnumItemWithData from '../../EnumItemWithData'

const parseFile = (parseSubNode: Input): TryParseNode<CoreNodesWithData[CoreNodeType.FILE]> =>
  async stream => {
    const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
    let length = 0
    const skip = (count: number): void => {
      skipSplittedAsyncIterator(splittedIterator, count)
      length += count
    }
    const nodes: EnumItemWithData[] = []
    while (true) {
      const parsedNode = await parseSubNode(splittedIterator.asyncIterable)
      if (parsedNode === undefined) {
        // Return undefined if there is a token which can't be parsed
        const { done } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
        if (done === true) break
        else return
      }
      const { node, length } = parsedNode
      nodes.push(node)
      skip(length)
    }

    return {
      node: {
        type: {
          enum: CoreNodeType,
          id: CoreNodeType.FILE
        },
        data: nodes
      },
      length
    }
  }

export default parseFile
