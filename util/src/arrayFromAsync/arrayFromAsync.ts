const arrayFromAsync = async <T>(asyncIterator: AsyncIterator<T>): Promise<T[]> => {
  const arr: T[] = []
  while (true) {
    const { value, done } = await asyncIterator.next()
    if (done === true) return arr
    arr.push(value)
  }
}

export default arrayFromAsync
