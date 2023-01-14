const arrayToAsyncIterable = <T>(array: readonly T[]): AsyncIterable<T> => ({
  async * [Symbol.asyncIterator] () {
    for (const element of array) {
      yield element
    }
  }
})

export default arrayToAsyncIterable
