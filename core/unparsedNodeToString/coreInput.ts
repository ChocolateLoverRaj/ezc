import coreUnparseTokenInput from '../unparseToken/unparseToken/coreInput'
import coreNodeUnparsers from './coreNodeUnparsers'
import Input from './Input'

const coreInput: Input = {
  unparseTokenInput: coreUnparseTokenInput,
  nodeUnparsers: coreNodeUnparsers
}

export default coreInput
