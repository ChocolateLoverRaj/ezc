import arrayToAsyncIterable from '../../../../util/arrayToAsyncIterable/arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import CoreInputFlag from '../../CoreInputFlag'
import CoreNodeType from '../../CoreNodeType'
import coreKeyWordsToInputFlags from '../coreKeyWordsToInputFlags'
import parseInputFlags from '../parseInputFlags'

test('nocapture noalias', async () => {
  const { flags, length, error } = await parseInputFlags(coreKeyWordsToInputFlags)(
    parseAllTokens(coreTryers)(
      arrayToAsyncIterable([
        'nocapture noalias'
      ])) as any)
  expect({ flags, length }).toEqual({
    flags: [{
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: {
        enum: CoreInputFlag,
        id: CoreInputFlag.NO_CAPTURE
      }
    }, {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: {
        enum: CoreInputFlag,
        id: CoreInputFlag.NO_ALIAS
      }
    }],
    length: 2
  })
  expect(error).toBeDefined()
})

test('nofree', async () => {
  const {
    error,
    flags,
    length
  } = await parseInputFlags(coreKeyWordsToInputFlags)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      'nofree'
    ])) as any)
  expect(flags).toEqual([{
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INPUT_FLAG
    },
    data: {
      enum: CoreInputFlag,
      id: CoreInputFlag.NO_FREE
    }
  }])
  expect(length).toEqual(1)
  expect(error).toBeDefined()
})
