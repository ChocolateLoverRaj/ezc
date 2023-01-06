import EnumItemWithData from '../../EnumItemWithData'
import Input from './Input'

const unparseToken = (unparsers: Input) => ({data, type}: EnumItemWithData): string => {
  return unparsers.get(type.enum)?.get(type.id)?.(data) as string
}

export default unparseToken
