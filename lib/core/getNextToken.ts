import InputController from './InputController'
import add from './matcher/add'
import create from './matcher/create'
import TokenWithData from './TokenWithData'

const getNextToken = async ({ get, free }: InputController): Promise<TokenWithData | undefined> => {
  const matcher = create([
    '@',
    '=',
    'private',
    'unnamed_addr',
    'constant',
    '[',
    ']',
    'x',
    'i',
    'c',
    'declare',
    '*',
    'define',
    'EntryBlock',
    '%',
    'call',
    'getelementptr',
    'inbounds'
  ])

  let string = ''
  for await (const chunk of get(Math.max(...matcher.find.map(s => s.length)))) {
    string += chunk
  }
  console.log(string)
  return undefined
}

export default getNextToken
