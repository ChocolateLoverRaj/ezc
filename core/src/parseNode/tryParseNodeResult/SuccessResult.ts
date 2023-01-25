import EnumItemWithData from '../../EnumItemWithData'
import ParsedNode from '../ParsedNode'
import BaseResult from './BaseResult'

interface SuccessResult<T extends EnumItemWithData> extends BaseResult {
  success: true
  result: ParsedNode<T>
}

export default SuccessResult
