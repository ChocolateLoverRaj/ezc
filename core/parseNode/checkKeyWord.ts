import CoreTokenType from '../CoreTokenType'
import EnumItem from '../EnumItem'
import EnumItemWithData from '../EnumItemWithData'
import checkToken from './checkToken'
import ErrorResult from './tryParseNodeResult/ErrorResult'

const checkKeyWord = async <T extends EnumItem>(
  asyncIterator: AsyncIterator<EnumItemWithData>,
  type: T,
  index: number,
  message: string,
  keyWord: EnumItem
): Promise<ErrorResult<T> | undefined> => {
  const result = await checkToken(asyncIterator, type, index, 'Expected key word', {
    enum: CoreTokenType,
    id: CoreTokenType.KEY_WORD
  })
  if (!result.success) return result

  const enumItem = result.result as EnumItem
  if (!(enumItem.enum === keyWord.enum && enumItem.id === keyWord.id)) {
    return {
      success: false,
      result: {
        type,
        index,
        message,
        subAttempts: undefined
      }
    }
  }
}

export default checkKeyWord
