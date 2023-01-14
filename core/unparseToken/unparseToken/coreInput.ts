import CoreTokenType from '../../CoreTokenType'
import unparseIdentifier from '../unparseIdentifier'
import unparseIntegerType from '../unparseIntegerType'
import coreUnparseKeyWordInput from '../unparseKeyWord/coreInput'
import unparseKeyWord from '../unparseKeyWord/unparseKeyWord'
import unparseNumberLiteral from '../unparseNumberLiteral'
import unparseStringLiteral from '../unparseStringLiteral'
import UnparseToken from '../UnparseToken'
import Input from './Input'

const coreInput: Input = new Map([
  [CoreTokenType, new Map<number, UnparseToken<unknown>>([
    [CoreTokenType.IDENTIFIER, unparseIdentifier],
    [CoreTokenType.INTEGER_TYPE, unparseIntegerType],
    [CoreTokenType.KEY_WORD, unparseKeyWord(coreUnparseKeyWordInput)],
    [CoreTokenType.NUMBER_LITERAL, unparseNumberLiteral],
    [CoreTokenType.STRING_LITERAL, unparseStringLiteral]
  ])]
])

export default coreInput
