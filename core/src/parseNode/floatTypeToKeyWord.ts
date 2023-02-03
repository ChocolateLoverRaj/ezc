import CoreKeyWord from '../CoreKeyWord'
import FloatType from './FloatType'

const floatTypeToKeyWord = new Map<FloatType, CoreKeyWord>([
  [FloatType.FLOAT, CoreKeyWord.FLOAT],
  [FloatType.BFLOAT, CoreKeyWord.BFLOAT],
  [FloatType.PPC_FP128, CoreKeyWord.PPC_FP128],
  [FloatType.FP128, CoreKeyWord.FP128],
  [FloatType.HALF, CoreKeyWord.HALF],
  [FloatType.X86_FP80, CoreKeyWord.X86_FP80],
  [FloatType.DOUBLE, CoreKeyWord.DUOBLE]
])

export default floatTypeToKeyWord
