import NodeByType from './NodeByType'

type Node = NodeByType[keyof NodeByType]

export default Node
