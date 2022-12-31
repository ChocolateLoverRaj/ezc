import EnumItemWithData from '../EnumItemWithData'

type UnparseToken<T extends EnumItemWithData> = (token: T) => string

export default UnparseToken
