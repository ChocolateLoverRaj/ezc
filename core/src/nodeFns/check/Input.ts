import AllNodeFns from '../AllNodeFns'

interface Input<T> {
  nodeData: T
  parentNodes: readonly T[]
  allNodeFns: AllNodeFns
}

export default Input
