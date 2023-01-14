import CoreTokenWithData from '../CoreTokenWithData'
import EnumItemWithData from '../EnumItemWithData'
import TryGetToken from './TryGetToken'

const parseToken3 =
  <T extends CoreTokenWithData[]>(
    tryers: ReadonlyArray<TryGetToken<T[number]>>
  ): TryGetToken<EnumItemWithData> => async stream => {
    for (const tryer of tryers) {
      const parsedToken = await tryer(stream)
      if (parsedToken !== undefined) {
        return {
          token: parsedToken.token,
          length: parsedToken.length
        }
      }
    }
  }

export default parseToken3
