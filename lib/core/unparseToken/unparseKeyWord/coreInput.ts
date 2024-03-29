import CoreKeyWord from '../../CoreKeyWord'
import Input from './Input'

const coreKeyWordToStringMap: Map<CoreKeyWord, string> = new Map([
  [CoreKeyWord.ALIGN, 'align'],
  [CoreKeyWord.CALL, 'call'],
  [CoreKeyWord.COMMA, ','],
  [CoreKeyWord.CONSTANT, 'constant'],
  [CoreKeyWord.DECLARE, 'declare'],
  [CoreKeyWord.DEFINE, 'define'],
  [CoreKeyWord.EQUALS, '='],
  [CoreKeyWord.GET_ELEMENT_PTR, 'getelementptr'],
  [CoreKeyWord.GLOBAL, 'global'],
  [CoreKeyWord.INBOUNDS, 'inbounds'],
  [CoreKeyWord.NO_ALIAS, 'noalias'],
  [CoreKeyWord.NO_CAPTURE, 'nocapture'],
  [CoreKeyWord.NO_FREE, 'nofree'],
  [CoreKeyWord.PRIVATE, 'private'],
  [CoreKeyWord.PTR, 'ptr'],
  [CoreKeyWord.RETURN, 'ret'],
  [CoreKeyWord.UNNAMED_ADDR, 'unnamed_addr'],
  [CoreKeyWord.VOID, 'void'],
  [CoreKeyWord.X, 'x'],
  [CoreKeyWord.OPEN_PARENTHESIS, '('],
  [CoreKeyWord.CLOSE_PARENTHESIS, ')'],
  [CoreKeyWord.OPEN_BRACKET, '['],
  [CoreKeyWord.CLOSE_BRACKET, ']'],
  [CoreKeyWord.OPEN_CURLY_BRACKET, '{'],
  [CoreKeyWord.CLOSE_CURLY_BRACKET, '}'],
  [CoreKeyWord.HALF, 'half'],
  [CoreKeyWord.BFLOAT, 'bfloat'],
  [CoreKeyWord.FLOAT, 'float'],
  [CoreKeyWord.DUOBLE, 'double'],
  [CoreKeyWord.FP128, 'fp128'],
  [CoreKeyWord.X86_FP80, 'x86_fp80'],
  [CoreKeyWord.PPC_FP128, 'ppc_fp128']
])

const coreInput: Input = new Map([
  [CoreKeyWord, coreKeyWordToStringMap]
])

export default coreInput
