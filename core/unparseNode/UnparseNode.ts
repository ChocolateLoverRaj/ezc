import UnparsedPart from './UnparsedPart'

type UnparseNode<T> = (data: T) => UnparsedPart[]

export default UnparseNode
