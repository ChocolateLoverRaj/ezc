interface SplittedAsyncIterator<T> {
  asyncIterable: AsyncIterable<T>
  alreadyReadElements: Array<Promise<IteratorResult<T>>>
}

export default SplittedAsyncIterator
