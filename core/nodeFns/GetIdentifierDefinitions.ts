import IdentifierDefinition from './IdentifierDefinition'

type GetIdentifierDefinitions<T> = (nodeData: T) => IdentifierDefinition[]

export default GetIdentifierDefinitions
