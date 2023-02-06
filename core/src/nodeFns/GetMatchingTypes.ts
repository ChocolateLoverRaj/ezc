import SimplifiedTypeWithData from '../simplifiedTypes/SimplifiedTypeWithData'

type GetMatchingTypes<T> = (data: T) => SimplifiedTypeWithData[]

export default GetMatchingTypes
