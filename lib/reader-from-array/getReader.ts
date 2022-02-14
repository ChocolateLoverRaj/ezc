import Reader from '../Reader'
import Data from './Data'

const reader = <T>(data: Data<T>): Reader<T> => ({
  getCurrent: () => data.array[data.index],
  next: () => {
    data.index++
  }
})

export default reader
