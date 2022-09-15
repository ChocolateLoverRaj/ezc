import {
  Module,
  LLVMContext,
  FunctionType,
  Type,
  Function,
  BasicBlock,
  IRBuilder,
  verifyFunction,
  verifyModule,
  ConstantInt,
  PointerType
} from 'llvm-bindings'

const context = new LLVMContext()
const module = new Module('myModule', context)
const builder = new IRBuilder(context)

const functionType = FunctionType.get(Type.getInt32Ty(context), true)
const fnMain = Function.Create(functionType, Function.LinkageTypes.ExternalLinkage, 'main', module)
const basicBlock = BasicBlock.Create(context, 'EntryBlock', fnMain)
builder.SetInsertPoint(basicBlock)

const printF = Function.Create(
  FunctionType.get(Type.getInt32Ty(context),
    [PointerType.get(Type.getInt8Ty(context), 0)],
    false),
  Function.LinkageTypes.ExternalLinkage, 'puts', module)

const messageStr = 'Hello'
const helloVar = builder.CreateGlobalString(messageStr)
builder.CreateCall(printF, [builder.CreatePointerCast(helloVar, PointerType.get(Type.getInt8Ty(context), 0))])
builder.CreateRet(ConstantInt.get(Type.getInt32Ty(context), 0))

if (verifyFunction(fnMain)) throw new Error('Error verifying function')
if (verifyModule(module)) throw new Error('Error verifying module')

console.log(module.print())
