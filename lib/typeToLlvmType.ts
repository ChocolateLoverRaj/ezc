import { Type } from 'llvm-bindings'
import llvmContext from './llvmContext'
import Token from './Token'
import typeTokens from './typeTokens'

const typeToLlvmType = (typeToken: typeof typeTokens[number]): Type => {
  switch (typeToken) {
    case Token.INT32:
      return Type.getInt32Ty(llvmContext)
    default:
      throw new Error('Cannot handle this type')
  }
}

export default typeToLlvmType
