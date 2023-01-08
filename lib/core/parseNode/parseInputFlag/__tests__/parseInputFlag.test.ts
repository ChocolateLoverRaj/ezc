import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import CoreInputFlag from '../../CoreInputFlag'
import CoreNodeType from '../../CoreNodeType'
import coreInput from '../coreInput'
import parseInputFlag from '../parseInputFlag'

test('nofree', async () => {
  await expect(parseInputFlag(coreInput)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      'nofree'
    ])) as any)).resolves.toEqual({
    node: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: {
        enum: CoreInputFlag,
        id: CoreInputFlag.NO_FREE
      }
    },
    length: 1
  })
})
