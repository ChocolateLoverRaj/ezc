import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import CoreInputFlag from '../../CoreInputFlag'
import CoreNodeType from '../../CoreNodeType'
import coreKeyWordsToInputFlags from '../coreKeyWordsToInputFlags'
import parseInputFlags from '../parseInputFlags'

test('nocapture noalias', async () => {
  await expect(parseInputFlags(coreKeyWordsToInputFlags)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      'nocapture noalias'
    ])) as any)).resolves.toEqual({
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
})

test('nofree', async () => {
  await expect(parseInputFlags(coreKeyWordsToInputFlags)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      'nofree'
    ])) as any)).resolves.toEqual({
    flags: [{
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: {
        enum: CoreInputFlag,
        id: CoreInputFlag.NO_FREE
      }
    }],
    length: 1
  })
})
