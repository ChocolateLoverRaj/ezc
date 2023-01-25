import arrayToAsyncIterable from 'util/dist/arrayToAsyncIterable/arrayToAsyncIterable.js'
import EnumItemWithData from '../../../EnumItemWithData'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import parseDeclare from '../parseDeclare'
import coreInput from '../coreInput'

test('declare i32 @puts(ptr)', async () => {
  const getTokensStream = (): AsyncIterable<EnumItemWithData> => parseAllTokens(coreTryers)(
    arrayToAsyncIterable(['declare i32 @puts(ptr)'])) as AsyncIterable<EnumItemWithData>

  await expect(parseDeclare(coreInput)(getTokensStream())).resolves.toMatchSnapshot()
})

test('declare void @someFn(ptr nocapture noalias, i64, i1)', async () => {
  const getTokensStream = (): AsyncIterable<EnumItemWithData> => parseAllTokens(coreTryers)(
    arrayToAsyncIterable([
      'declare void @someFn(ptr nocapture noalias, i64, i1)'])) as AsyncIterable<EnumItemWithData>

  await expect(parseDeclare(coreInput)(getTokensStream())).resolves.toMatchSnapshot()
})
