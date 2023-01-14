import splitAsyncIterator from '../../../util/splitAsyncIterator/splitAsyncIterator'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import skipSplittedAsyncIterable from '../../../util/splitAsyncIterator/skip'
import CoreTokenType from '../../CoreTokenType'
import CoreTokensWithData from '../../CoreTokensWithData'
import CoreKeyWord from '../../CoreKeyWord'
import tryNodeParsers from '../tryNodeParsers'
import parseIdentifier from '../parseIdentifier'
import CallAssignableInput from './CallAssignableInput'

const parseCallAssignable = (
  { typeParsers, valueParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.CALL_ASSIGNABLE]> => async stream => {
  const splittedIterator = splitAsyncIterator(stream[Symbol.asyncIterator]())
  let length = 0
  const skip = (count: number): void => {
    skipSplittedAsyncIterable(splittedIterator, count)
    length += count
  }

  // Check for 'call'
  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.CALL)) return
    skip(1)
  }

  // Check for type
  const parsedReturnType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
  if (parsedReturnType === undefined) return
  skip(parsedReturnType.length)

  // Check for identifier
  const parsedIdentifier = await parseIdentifier(splittedIterator.asyncIterable)
  if (parsedIdentifier === undefined) return
  skip(parsedIdentifier.length)

  // Check for (
  {
    const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
    if (done === true) return
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.OPEN_PARENTHESIS)) return
    skip(1)
  }

  // Parse all inputs
  const inputs: CallAssignableInput[] = []
  for (let firstInput = true; ;firstInput = false) {
    // Check for ) or ,
    {
      const { done, value } = await splittedIterator.asyncIterable[Symbol.asyncIterator]().next()
      if (done === true) return
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (data.enum === CoreKeyWord && data.id === CoreKeyWord.CLOSE_PARENTHESIS) {
          skip(1)
          break
        }
      }
      if (!firstInput) {
        if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) return
        const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
        if (!(data.enum === CoreKeyWord && data.id === CoreKeyWord.COMMA)) return
        skip(1)
      }
    }

    const parsedInputType = await tryNodeParsers(typeParsers)(splittedIterator.asyncIterable)
    if (parsedInputType === undefined) return
    skip(parsedInputType.length)

    const parsedInputValue = await tryNodeParsers(valueParsers)(splittedIterator.asyncIterable)
    if (parsedInputValue === undefined) return
    skip(parsedInputValue.length)

    inputs.push({
      type: parsedInputType.node,
      value: parsedInputValue.node
    })
  }

  return {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.CALL_ASSIGNABLE

      },
      data: {
        name: parsedIdentifier.node.data.name,
        inputs,
        returnType: parsedReturnType.node
      }
    },
    length
  }
}

export default parseCallAssignable
