import {
  Module,
  LLVMContext,
  FunctionType,
  Type,
  Function,
  BasicBlock,
  IRBuilder,
  verifyFunction,
  verifyModule
} from 'llvm-bindings'

const context = new LLVMContext()
const module = new Module('myModule', context)
const builder = new IRBuilder(context)

const functionType = FunctionType.get(
  Type.getInt32Ty(context), [
    builder.getInt32Ty(),
    builder.getInt32Ty()
  ], true)
const fnSum = Function.Create(functionType, Function.LinkageTypes.ExternalLinkage, 'sum', module)
const basicBlock = BasicBlock.Create(context, 'EntryBlock', fnSum)
builder.SetInsertPoint(basicBlock)

const instruction = builder.CreateAdd(fnSum.getArg(0), fnSum.getArg(1))
builder.CreateRet(instruction)

if (verifyFunction(fnSum)) throw new Error('Error verifying function')
if (verifyModule(module)) throw new Error('Error verifying module')

console.log(module.print())
