interface Reader<T> {
  getCurrent: () => T | undefined
  next: () => void
}

export default Reader
