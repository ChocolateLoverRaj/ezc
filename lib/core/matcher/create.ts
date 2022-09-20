import Matcher from './Matcher'

const create = <T extends string[]>(find: T): Matcher<T> => {
  const matches: number[] = []
  for (let i = 0; i < find.length; i++) matches.push(i)

  return {
    find,
    matches,
    index: 0
  }
}

export default create
