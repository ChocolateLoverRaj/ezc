/**
 * Measures the length of if you did `String.prototype.trimStart()` on an async iterable
 */
const measureWhitespace = async (stream: AsyncIterable<string>): Promise<number> => {
  let totalWhitespace = 0
  for await (const chunk of stream) {
    const whitespace = chunk.length - chunk.trimStart().length
    totalWhitespace += whitespace
    if (whitespace < chunk.length) break
  }
  return totalWhitespace
}

export default measureWhitespace
