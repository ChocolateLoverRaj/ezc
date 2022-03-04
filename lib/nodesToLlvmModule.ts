import {
  IRBuilder,
  LLVMContext,
  Module
} from 'llvm-bindings'
import Node from './Node'
import NodeType from './NodeType'
import typeToLlvmType from './typeToLlvmType'

const nodesToLlvm = (nodes: Node[], moduleId: string): Module => {
  const context = new LLVMContext()
  const module = new Module(moduleId, context)
  const builder = new IRBuilder(context)

  nodes.forEach(node => {
    if (node.type === NodeType.VARIABLE_INITIALIZE) {
      const llvmVar = builder.CreateAlloca(
        typeToLlvmType(node.data.type), undefined, node.data.variableIdentifier)
      if (node.data.initializedValue !== undefined) {
        builder.CreateAdd(llvmVar.getName())
      }
    }
  })

  return module
}

export default nodesToLlvm
