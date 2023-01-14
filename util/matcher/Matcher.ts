interface Matcher<T extends readonly string[]> {
  find: T
  matches: number[]
  index: number
}

export default Matcher
