import EnumItem from '../../EnumItem'
import ParsedNodeError from '../ParseNodeError'
import BaseResult from './BaseResult'

interface ErrorResult<T extends EnumItem> extends BaseResult {
  success: false
  result: ParsedNodeError<T>
}

export default ErrorResult
