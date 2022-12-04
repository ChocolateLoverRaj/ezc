import arrayFromAsync from '../../arrayFromAsync'
import arrayToAsyncIterable from '../../arrayToAsyncIterable'
import EnumItemWithData from '../../EnumItemWithData'
import coreTryers from '../../tryGetToken/coreTryers'
import parseAllTokens from '../../tryGetToken/parseAllTokens'
import CoreNodesWithData from '../CoreNodesWithData'
import CoreNodeType from '../CoreNodeType'
import coreTypeParsers from '../coreTypeParsers'
import InputFlag from '../InputFlag'
import parseDeclare from '../parseDeclare'
import ParsedNode from '../ParsedNode'

test('declare i32 @puts(ptr)', async () => {
  const getTokensStream = (): AsyncIterable<EnumItemWithData> => parseAllTokens(coreTryers)(
    arrayToAsyncIterable(['declare i32 @puts(ptr)'])) as AsyncIterable<EnumItemWithData>

  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.DECLARE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.DECLARE
      },
      data: {
        name: 'puts',
        type: {
          returnType: {
            type: {
              enum: CoreNodeType,
              id: CoreNodeType.INTEGER_TYPE
            },
            data: 32
          },
          inputTypes: [{
            type: {
              type: {
                enum: CoreNodeType,
                id: CoreNodeType.POINTER_TYPE
              },
              data: undefined
            },
            flags: []
          }]
        }
      }
    },
    length: (await arrayFromAsync(getTokensStream()[Symbol.asyncIterator]())).length
  }
  await expect(parseDeclare(coreTypeParsers)(getTokensStream())).resolves.toEqual(expected)
})

test('declare void @someFn(ptr nocapture noalias, i64, i1)', async () => {
  const getTokensStream = (): AsyncIterable<EnumItemWithData> => parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      'declare void @someFn(ptr nocapture noalias, i64, i1)'])) as AsyncIterable<EnumItemWithData>

  const expected: ParsedNode<CoreNodesWithData[CoreNodeType.DECLARE]> = {
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.DECLARE
      },
      data: {
        name: 'someFn',
        type: {
          returnType: {
            type: {
              enum: CoreNodeType,
              id: CoreNodeType.VOID_TYPE
            },
            data: undefined
          },
          inputTypes: [{
            type: {
              type: {
                enum: CoreNodeType,
                id: CoreNodeType.POINTER_TYPE
              },
              data: undefined
            },
            flags: [InputFlag.NO_CAPTURE, InputFlag.NO_ALIAS]
          }, {
            type: {
              type: {
                enum: CoreNodeType,
                id: CoreNodeType.INTEGER_TYPE
              },
              data: 64
            },
            flags: []
          }, {
            type: {
              type: {
                enum: CoreNodeType,
                id: CoreNodeType.INTEGER_TYPE
              },
              data: 1
            },
            flags: []
          }]
        }
      }
    },
    length: (await arrayFromAsync(getTokensStream()[Symbol.asyncIterator]())).length
  }
  await expect(parseDeclare(coreTypeParsers)(getTokensStream())).resolves.toEqual(expected)
})
