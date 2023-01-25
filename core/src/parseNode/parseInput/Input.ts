import EnumItemWithData from '../../EnumItemWithData'
import TryParseNode from '../TryParseNode'
import KeyWordsToInputFlags from '../parseInputFlags/Input'

interface Input {
  typeParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
  keyWordsToInputFlags: KeyWordsToInputFlags
}

export default Input
