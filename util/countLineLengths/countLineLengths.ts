import { EOL } from 'os'

const countLineLengths = async function * (stream: AsyncIterable<string>): AsyncGenerator<number> {
  let lineLength = 0
  for await (const chunk of stream) {
    let keepChunk = chunk
    while (true) {
      const eolIndex = keepChunk.indexOf(EOL)
      if (eolIndex === -1) break
      lineLength += eolIndex
      yield lineLength
      lineLength = 0
      keepChunk = keepChunk.slice(eolIndex + EOL.length)
    }
    lineLength += keepChunk.length
  }
  yield lineLength
}

export default countLineLengths
