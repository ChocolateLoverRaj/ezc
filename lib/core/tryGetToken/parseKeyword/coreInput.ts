import EnumItem from '../../EnumItem'
import coreUnparseKeyWordInput from '../../unparseToken/unparseKeyWord/coreInput'
import Input from './Input'

const coreInput: Input = new Map([...coreUnparseKeyWordInput]
  .flatMap(([_enum, map]) => [...map]
    .map<[string, EnumItem]>(([id, string]) => [string, { enum: _enum, id }])))

export default coreInput
