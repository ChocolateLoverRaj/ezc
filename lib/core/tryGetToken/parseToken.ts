import tryers from './tryers'
import TryGetToken from './TryGetToken'

const parseToken: TryGetToken = async stream => {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async function * fn () {
    for await (const chunk of stream) {
      const trimmedChunk = chunk.trimStart()
      yield trimmedChunk
    }
  }
  // const subStream = fn()
  // return await Promise.race(tryers.map(async tryer => await tryer(subStream)))
  for (const tryer of tryers) {
    const token = await tryer(fn())
    if (token !== undefined) {
      console.log(tryer, token)
      return token
    }
  }
}

export default parseToken
