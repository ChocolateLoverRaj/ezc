import FailableResult from '../../../util/failableResult/FailableResult'
import EnumItem from '../../EnumItem'
import EnumItemWithData from '../../EnumItemWithData'
import ParsedNode from '../ParsedNode'
import ParsedNodeError from '../ParseNodeError'

type Output = FailableResult<ParsedNode<EnumItemWithData>, Array<ParsedNodeError<EnumItem>>>

export default Output
