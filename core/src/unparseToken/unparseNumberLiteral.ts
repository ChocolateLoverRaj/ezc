import CoreTokenDatas from '../CoreTokenDatas'
import CoreTokenType from '../CoreTokenType'
import FloatType from '../parseNode/FloatType'
import UnparseToken from './UnparseToken'

const unparseNumberLiteral: UnparseToken<CoreTokenDatas[CoreTokenType.NUMBER_LITERAL]> =
  ({ value, floatType }) => {
    switch (floatType) {
      case FloatType.DOUBLE: {
        let string = new Float64Array([value])[0].toString()
        if (!string.includes('.')) string += '.0'
        return string
      }
      case FloatType.FLOAT: {
        let string = new Float32Array([value])[0].toString()
        if (!string.includes('.')) string += '.0'
        return string
      }
      case undefined:
        return value.toString()
      default:
        throw new Error('Node unparser for float type not implemented yet')
    }
  }

export default unparseNumberLiteral
