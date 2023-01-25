import EnumItemWithData from '../../EnumItemWithData'
import ErrorResult from './ErrorResult'
import SuccessResult from './SuccessResult'

type TryParseNodeResult<T extends EnumItemWithData> = SuccessResult<T> | ErrorResult<T['type']>

export default TryParseNodeResult
