import EnumItemWithData from '../../EnumItemWithData'
import TryParseNode from '../TryParseNode'

interface Input {
  typeParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
  valueParsers: ReadonlyArray<TryParseNode<EnumItemWithData>>
}

export default Input
