import Matcher from './Matcher'
import State from './State'

const getState = (matcher: Matcher<string[]>): State => {
  const couldMatch = matcher.find.filter(s => s.startsWith(matcher.match))
  
}

export default getState
