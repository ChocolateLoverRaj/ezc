import EnumItemWithData from '../../EnumItemWithData'

type IteratorValue = {
  error: true
  value: undefined
} | {
  error: false
  value: {
    length: number
    token: EnumItemWithData | undefined
  }
}

export default IteratorValue
