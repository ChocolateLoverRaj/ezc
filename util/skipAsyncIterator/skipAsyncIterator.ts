const skipAsyncIterator = async (
  asyncIterator: AsyncIterator<unknown>, elements: number
): Promise<void> => {
  for (let i = 0; i < elements; i++) {
    await asyncIterator.next()
  }
}

export default skipAsyncIterator
