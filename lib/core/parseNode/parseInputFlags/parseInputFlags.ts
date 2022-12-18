import CoreTokensWithData from '../../CoreTokensWithData'
import CoreTokenType from '../../CoreTokenType'
import EnumItem from '../../EnumItem'
import EnumItemWithData from '../../EnumItemWithData'
import Input from './Input'
import Output from './Output'

const parseInputFlags = (
  keyWordsToInputFlags: Input
) => async (stream: AsyncIterable<EnumItemWithData>): Output => {
  const flags: EnumItem[] = []
  for await (const value of stream) {
    if (!(value.type.enum === CoreTokenType && value.type.id === CoreTokenType.KEY_WORD)) break
    const { data } = value as CoreTokensWithData[CoreTokenType.KEY_WORD]
    const flag = keyWordsToInputFlags.get(data.enum)?.get(data.id)
    if (flag === undefined) break
    flags.push(flag)
  }
  return {
    flags,
    length: flags.length
  }
}

export default parseInputFlags
