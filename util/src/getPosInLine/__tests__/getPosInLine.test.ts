import getPosInLine from '../getPosInLine'
import PosInLine from '../PosInLine'

test('works', () => {
  expect(getPosInLine(1, [
    10,
    7,
    5
  ], 14)).toEqual<PosInLine>({
    line: 1,
    characterInLine: 3
  })
})
