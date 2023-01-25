import reverseMap from '../reverseMap'

test('works', () => {
  expect(reverseMap(new Map([
    ['Key0', 'Value0'],
    ['Key1', 'Value1']
  ]))).toEqual(new Map([
    ['Value0', 'Key0'],
    ['Value1', 'Key1']
  ]))
})
