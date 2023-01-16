import EnumItem from '../../EnumItem'
import EnumItemWithData from '../../EnumItemWithData'
import ParsedNodeError from '../ParseNodeError'

type Output = Promise<{
  flags: EnumItemWithData[]
  /**
   * This is so that in the future flags could be made up of more than one token
   */
  length: number
  error: ParsedNodeError<EnumItem>
}>

export default Output
