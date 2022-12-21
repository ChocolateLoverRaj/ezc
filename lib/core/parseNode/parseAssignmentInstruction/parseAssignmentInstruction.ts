import CoreKeyWord from '../../CoreKeyWord'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import skip from '../../splitAsyncIterator/skip'
import splitAsyncIterator from '../../splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import parseIdentifier from '../parseIdentifier'
import tryNodeParsers from '../tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'

const parseAssignmentInstruction = (
  assignableParsers: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.ASSIGNMENT_INSTRUCTION]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())

  const parsedIdentifier = await parseIdentifier(splittedIterator.asyncIterable)
  if (parsedIdentifier === undefined) return
  skip(splittedIterator, parsedIdentifier.length)

  {
    const { value, done } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.EQUALS)) return
    skip(splittedIterator, 1)
  }

  const parsedAssignable = await tryNodeParsers(assignableParsers)(splittedIterator.asyncIterable)
  if (parsedAssignable === undefined) return
  skip(splittedIterator, parsedAssignable.length)

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.ASSIGNMENT_INSTRUCTION
      },
      data: {
        identifier: parsedIdentifier.node,
        assignable: parsedAssignable.node
      }
    },
    length: parsedIdentifier.length + 1 + parsedAssignable.length
  }
}

export default parseAssignmentInstruction
