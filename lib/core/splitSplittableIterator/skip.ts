import SliceElement from './SliceElement'
import SplittedSplittableIterator from './SplittedSplittableIterator'

const skip = <T>(
  splittedSplittableIterator: SplittedSplittableIterator<T>,
  numberOfElements: number,
  slice: SliceElement<T>
): void => {
  splittedSplittableIterator.alreadyReadElement =
    slice(splittedSplittableIterator.alreadyReadElement, numberOfElements, Infinity)
}

export default skip
