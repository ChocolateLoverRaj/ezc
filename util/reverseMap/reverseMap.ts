const reverseMap = <K, V>(map: Map<K, V>): Map<V, K> =>
  new Map([...map].map(keyValue => keyValue.reverse() as [V, K]))

export default reverseMap
