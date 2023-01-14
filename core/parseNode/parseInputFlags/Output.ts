import EnumItemWithData from '../../EnumItemWithData'

type Output = Promise<{
  flags: EnumItemWithData[]
  /**
   * This is so that in the future flags could be made up of more than one token
   */
  length: number
}>

export default Output
