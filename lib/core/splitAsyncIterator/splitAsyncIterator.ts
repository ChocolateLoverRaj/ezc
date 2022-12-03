import SplittedAsyncIterator from './SplittedAsyncIterator'

/**
 * Remembers what elements were read from the input async iterator and outputs those in
 * each split iterator.
 */
const splitAsyncIterator = <T>(asyncIterator: AsyncIterator<T>): SplittedAsyncIterator<T> => {
  const alreadyReadElements: Array<Promise<IteratorResult<T>>> = []

  return {
    alreadyReadElements,
    asyncIterable: {
      async * [Symbol.asyncIterator] () {
        for (let i = 0; i < Infinity; i++) {
          if (i >= alreadyReadElements.length) {
            alreadyReadElements.push(asyncIterator.next())
          }
          const { value, done } = await alreadyReadElements[i]
          if (done === true) break
          yield value
        }
      }
    }
  }
}

export default splitAsyncIterator
