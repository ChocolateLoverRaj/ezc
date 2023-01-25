async function * charAsyncIterable (
  stringAsyncIterable: AsyncIterable<string>
): AsyncIterable<string> {
  for await (const string of stringAsyncIterable) {
    for (const char of string) {
      yield char
    }
  }
}

export default charAsyncIterable
