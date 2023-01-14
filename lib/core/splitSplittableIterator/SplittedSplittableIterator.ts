interface SplittedSplittableIterator<T> {
  asyncIterable: AsyncIterable<T>
  alreadyReadElement: T
  nextElement: Promise<T | undefined> | undefined
}

export default SplittedSplittableIterator
