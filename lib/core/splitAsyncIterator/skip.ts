import SplittedAsyncIterator from './SplittedAsyncIterator'

const skip = (
  splittedAsyncIterator: SplittedAsyncIterator<unknown>,
  numberOfElements: number
): void => {
  splittedAsyncIterator.alreadyReadElements.splice(0, numberOfElements)
}

export default skip
