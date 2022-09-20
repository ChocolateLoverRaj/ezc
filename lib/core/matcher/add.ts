import Matcher from './Matcher'

const add = (matcher: Matcher<string[]>, string: string): void => {
  const newIndex = matcher.index + string.length
  matcher.matches = matcher.matches.filter(
    index => matcher.find[index].slice(matcher.index, newIndex) === string)
}

export default add
