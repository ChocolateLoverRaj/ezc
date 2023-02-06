import SimplifiedTypeWithData from '../simplifiedTypes/SimplifiedTypeWithData'

type GetSimplifiedType<T> = (data: T) => SimplifiedTypeWithData

export default GetSimplifiedType
