interface Reader<T> {
  getCurrent: () => T;
  next: () => void;
}

export default Reader;
