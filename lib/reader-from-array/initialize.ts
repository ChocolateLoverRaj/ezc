import Data from './Data'

const initialize = <T>(array: readonly T[]): Data<T> => ({
  array,
  index: 0
})

export default initialize
