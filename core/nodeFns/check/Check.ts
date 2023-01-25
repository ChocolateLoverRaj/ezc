import Input from './Input'
import Output from './Output'

type Check<T> = (input: Input<T>) => Output

export default Check
