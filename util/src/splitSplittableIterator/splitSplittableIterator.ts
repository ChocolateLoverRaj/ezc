import SplittedSplittableIterator from './SplittedSplittableIterator'

/**
 * Remembers what elements were read from the input async iterator and outputs those in
 * each split iterator.
 */
const splitSplittableIterator = <T>(
  initialElement: T,
  join: (element0: T, element1: T) => T,
  asyncIterator: AsyncIterator<T>
): SplittedSplittableIterator<T> => {
  const splittedSplittableIterator: SplittedSplittableIterator<T> = {
    alreadyReadElement: initialElement,
    asyncIterable: {
      async * [Symbol.asyncIterator] () {
        yield splittedSplittableIterator.alreadyReadElement
        while (true) {
          const nextElement = await (splittedSplittableIterator.nextElement ??
            (splittedSplittableIterator.nextElement = (async () => {
              const { done, value } = await asyncIterator.next()
              if (done === true) return
              splittedSplittableIterator.nextElement = undefined
              splittedSplittableIterator.alreadyReadElement = join(
                splittedSplittableIterator.alreadyReadElement, value)
              return value
            })()))
          if (nextElement === undefined) break
          yield nextElement
        }
      }
    },
    nextElement: undefined
  }
  return splittedSplittableIterator
}

export default splitSplittableIterator
