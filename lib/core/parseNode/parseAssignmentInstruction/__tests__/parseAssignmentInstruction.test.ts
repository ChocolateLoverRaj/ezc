import arrayToAsyncIterable from '../../../arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import parseAssignmentInstruction from '../parseAssignmentInstruction'

test('%char = call i32 @getchar()', async () => {
  await expect(parseAssignmentInstruction(coreInput)(parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      '%char = call i32 @getchar()'
    ])) as any)).resolves.toMatchSnapshot()
})
