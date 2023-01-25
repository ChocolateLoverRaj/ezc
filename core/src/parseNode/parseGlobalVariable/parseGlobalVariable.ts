import CoreTokenDatas from '../../CoreTokenDatas'
import CoreTokenType from '../../CoreTokenType'
import CoreKeyWord from '../../CoreKeyWord'
import skip from 'util/dist/splitAsyncIterator/skip.js'
import splitAsyncIterator from 'util/dist/splitAsyncIterator/splitAsyncIterator.js'
import ConstantOrGlobal from '../ConstantOrGlobal'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import Linkage from '../Linkage'
import parseIdentifier from '../parseIdentifier'
import tryNodeParsers from '../tryNodeParsers/tryNodeParsers'
import TryParseNode from '../TryParseNode'
import Input from './Input'
import checkKeyWord from '../checkKeyWord'

const parseGlobalVariable = (
  { typeParsers, valueParsers }: Input
): TryParseNode<CoreNodesWithData[CoreNodeType.GLOBAL_VARIABLE]> =>
  async stream => {
    const type = {
      enum: CoreNodeType,
      id: CoreNodeType.GLOBAL_VARIABLE
    }
    const asyncIterator = stream[Symbol.asyncIterator]()
    const splittedAsyncIterator = splitAsyncIterator(asyncIterator)
    const parsedIdentifier = await parseIdentifier(splittedAsyncIterator.asyncIterable)
    if (!parsedIdentifier.success) {
      return {
        success: false,
        result: {
          type,
          index: 0,
          message: 'Expected identifier',
          subAttempts: [parsedIdentifier.result]
        }
      }
    }
    skip(splittedAsyncIterator, parsedIdentifier.result.length)

    {
      const error = await checkKeyWord(
        splittedAsyncIterator.asyncIterable[Symbol.asyncIterator](),
        type,
        parsedIdentifier.result.length,
        'Expected equals',
        { enum: CoreKeyWord, id: CoreKeyWord.EQUALS }
      )
      if (error !== undefined) return error
      skip(splittedAsyncIterator, 1)
    }

    const allowedKeyWords = [
      CoreKeyWord.PRIVATE,
      CoreKeyWord.CONSTANT,
      CoreKeyWord.GLOBAL,
      CoreKeyWord.UNNAMED_ADDR
    ]

    const keyWords: CoreKeyWord[] = []
    for await (const value of splittedAsyncIterator.asyncIterable) {
      if (value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD) {
        const data = value.data as CoreTokenDatas[CoreTokenType.KEY_WORD]
        if (!(data.enum === CoreKeyWord && allowedKeyWords.includes(data.id))) break
        keyWords.push(data.id)
      } else {
        break
      }
    }
    skip(splittedAsyncIterator, keyWords.length)
    const isConstant = keyWords.includes(CoreKeyWord.CONSTANT)
    const isGlobal = keyWords.includes(CoreKeyWord.GLOBAL)
    // Must have exactly one of constant or global
    if (Number(isConstant) + Number(isGlobal) !== 1) {
      return {
        success: false,
        result: {
          type,
          index: parsedIdentifier.result.length + 1 + keyWords.length,
          message: 'Cannot have both constant and global',
          subAttempts: undefined
        }
      }
    }

    const parseTypeResult = await tryNodeParsers(typeParsers)(splittedAsyncIterator.asyncIterable)
    if (!parseTypeResult.success) {
      return {
        success: false,
        result: {
          type,
          index: parsedIdentifier.result.length + 1 + keyWords.length,
          message: 'Expected type',
          subAttempts: parseTypeResult.result
        }
      }
    }
    skip(splittedAsyncIterator, parseTypeResult.result.length)

    const parseValueResult = await tryNodeParsers(valueParsers)(splittedAsyncIterator.asyncIterable)
    if (!parseValueResult.success) {
      return {
        success: false,
        result: {
          type,
          index: parsedIdentifier.result.length + 1 + keyWords.length +
            parseTypeResult.result.length,
          message: 'Expected value',
          subAttempts: parseValueResult.result
        }
      }
    }
    skip(splittedAsyncIterator, parseValueResult.result.length)

    return {
      success: true,
      result: {
        node: {
          type,
          data: {
            // FIXME: No align logic
            align: undefined,
            constantOrGlobal: isConstant
              ? ConstantOrGlobal.CONSTANT
              : ConstantOrGlobal.GLOBAL,
            identifier: parsedIdentifier.result.node,
            // FIXME: No other linkage types
            linkage: Linkage.PRIVATE,
            type: parseTypeResult.result.node,
            unnamed_addr: keyWords.includes(CoreKeyWord.UNNAMED_ADDR),
            value: parseValueResult.result.node
          }
        },
        length: parsedIdentifier.result.length + 1 + keyWords.length +
        parseTypeResult.result.length + parseValueResult.result.length
      }
    }
  }

export default parseGlobalVariable
