interface Matcher<T extends string[]> {
  find: T
  matches: number[]
  index: number
}

export default Matcher
