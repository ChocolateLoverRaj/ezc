import UnparsedPartType from '../unparseNode/UnparsedPartType'
import Input from './Input'
import unparseToken from '../unparseToken/unparseToken/unparseToken'
import UnparsedPart from '../unparseNode/UnparsedPart'

const indentSpaces = 2
const indentStr = ' '.repeat(indentSpaces)
const unparsedNodeToString = ({ nodeUnparsers, unparseTokenInput }: Input) => (
  unparsedParts: readonly UnparsedPart[]
): string => {
  let indentLevel = 0
  let string = ''
  const partsToUnparse: UnparsedPart[] = [...unparsedParts]
  while (partsToUnparse.length > 0) {
    const { type, data } = partsToUnparse[0]
    partsToUnparse.shift()
    if (type === UnparsedPartType.NEW_LINE) {
      string += `\n${indentStr.repeat(indentLevel)}`
    } else if (type === UnparsedPartType.INDENT) {
      string += indentStr
      indentLevel++
    } else if (type === UnparsedPartType.UNINDENT) {
      indentLevel--
    } else if (type === UnparsedPartType.SPACE) {
      string += ' '
    } else if (type === UnparsedPartType.TOKEN) {
      string += unparseToken(unparseTokenInput)(data)
    } else if (type === UnparsedPartType.NODE) {
      const unparsedParts =
        nodeUnparsers.get(data.type.enum)?.get(data.type.id)?.(data.data) as UnparsedPart[]
      if (unparsedParts === undefined) console.log(data)
      partsToUnparse.unshift(...unparsedParts)
    }
  }

  return string
}

export default unparsedNodeToString
