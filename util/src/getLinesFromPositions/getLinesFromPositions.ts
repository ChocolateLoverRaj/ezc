import { EOL } from 'os'

const getLinesFromPositions = async function * (
  stream: AsyncIterable<string>,
  positions: number[]
): AsyncGenerator<{
    line: number
    characterInLine: number
  }> {
  let positionIndex = 0
  let index = 0
  let line = 0
  for await (const chunk of stream) {
    let keepChunk = chunk
    while (true) {
      const eolIndex = keepChunk.indexOf(EOL)
      if (eolIndex === -1) break
      while (positions[positionIndex] < index + eolIndex) {
        yield { line, characterInLine: positions[positionIndex] - index }
        positionIndex++
      }
      line++
      index += eolIndex + 1
      keepChunk = keepChunk.slice(eolIndex + 1)
    }
    while (positions[positionIndex] < index + keepChunk.length) {
      yield { line, characterInLine: positions[positionIndex] - index }
      positionIndex++
    }
    index += keepChunk.length
  }
  return undefined
}

export default getLinesFromPositions
