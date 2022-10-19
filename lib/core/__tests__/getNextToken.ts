import getNextToken from '../getNextToken'
import stringToInputController from '../stringToInputController'

test('test', () => {
  getNextToken(stringToInputController('hi'))
})
