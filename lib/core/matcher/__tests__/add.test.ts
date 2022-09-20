import add from '../add'
import create from '../create'

test('reduces possible matches', () => {
  const matcher = create(['apple', 'apricot', 'banana'])
  add(matcher, 'a')
  expect(matcher.matches).toEqual([0, 1])
})
