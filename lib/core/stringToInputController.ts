import InputController from './InputController'

const stringToInputController = (string: string): InputController => {
  let index = 0
  return {
    get: async function * (length) {
      yield string.slice(index, length)
    },
    free: async length => {
      index += length
    }
  }
}

export default stringToInputController
