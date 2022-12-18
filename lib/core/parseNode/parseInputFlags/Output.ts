import EnumItem from '../../EnumItem'

type Output = Promise<{
  flags: EnumItem[]
  /**
   * This is so that in the future flags could be made up of more than one token
   */
  length: number
}>

export default Output
