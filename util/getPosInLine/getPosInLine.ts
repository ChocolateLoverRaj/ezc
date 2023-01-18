import PosInLine from './PosInLine'

const getPosInLine = (
  eolLength: number,
  lineLengths: readonly number[],
  pos: number
): PosInLine | undefined => {
  let index = 0
  for (let lineIndex = 0; lineIndex < lineLengths.length; lineIndex++) {
    const lineLength = lineLengths[lineIndex]
    if (pos < index + lineLength) {
      return { line: lineIndex, characterInLine: pos - index }
    }
    index += lineLength + eolLength
  }
}

export default getPosInLine
