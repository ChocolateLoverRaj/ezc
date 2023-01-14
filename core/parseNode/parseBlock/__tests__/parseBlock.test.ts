import arrayToAsyncIterable from '../../../../util/arrayToAsyncIterable/arrayToAsyncIterable'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInstructionParsers from '../coreInstructionParsers'
import parseBlock from '../parseBlock'

// test('EntryBlock: <no ending instruction>', async () => {
//   await expect(parseBlock(coreInstructionParsers)(parseAllTokens(coreTryers)(
//     arrayToAsyncIterable([
//       'EntryBlock:'
//     ])) as any)).resolves.toBeUndefined()
// })

test('MyBlock: <return>', async () => {
  await expect(parseBlock(coreInstructionParsers)(parseAllTokens(coreTryers)(arrayToAsyncIterable([`
      MyBlock:
        ret i1 0
  `])) as any)).resolves.toMatchSnapshot()
})

test('0: <return>', async () => {
  await expect(parseBlock(coreInstructionParsers)(parseAllTokens(coreTryers)(arrayToAsyncIterable([`
      0:
        ret i1 0
  `])) as any)).resolves.toMatchSnapshot()
})
