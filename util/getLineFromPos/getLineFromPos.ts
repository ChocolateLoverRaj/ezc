import { EOL } from 'os'

const getLineFromPos = async (stream: AsyncIterable<string>, pos: number): Promise<{
  line: number
  characterInLine: number
} | undefined> => {
  let index = 0
  let line = 0
  for await (const chunk of stream) {
    if (index + chunk.length > pos) {
      let currentLine = chunk
      while (true) {
        const eolIndex = currentLine.indexOf(EOL)
        if (eolIndex === -1 || index + eolIndex + EOL.length > pos) break
        currentLine = currentLine.slice(eolIndex + EOL.length)
        index += eolIndex + EOL.length
        line++
      }
      return {
        line,
        characterInLine: pos - index
      }
    } else {
      index += chunk.length
      let currentLine = chunk
      while (true) {
        const eolIndex = currentLine.indexOf(EOL)
        if (eolIndex === -1) break
        currentLine = currentLine.slice(eolIndex + EOL.length)
        line++
      }
    }
  }
  return undefined
}

export default getLineFromPos
