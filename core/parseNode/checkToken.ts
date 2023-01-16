import FailableResult from '../../util/failableResult/FailableResult'
import EnumItem from '../EnumItem'
import EnumItemWithData from '../EnumItemWithData'
import ParsedNodeError from './ParseNodeError'
import ErrorResult from './tryParseNodeResult/ErrorResult'

const checkToken = async <T extends EnumItem>(
  asyncIterator: AsyncIterator<EnumItemWithData>,
  type: T,
  index: number,
  message: string,
  token: EnumItem
): Promise<FailableResult<any, ParsedNodeError<T>>> => {
  const error: ErrorResult<T> = {
    success: false,
    result: {
      type,
      index,
      message,
      subAttempts: undefined
    }
  }
  const { value, done } = await asyncIterator.next()
  if (done === true) return error
  if (!(value.type.enum === token.enum && value.type.id === token.id)) {
    return error
  }
  return {
    success: true,
    result: value.data
  }
}

export default checkToken
