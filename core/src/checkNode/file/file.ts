import IdentifierType from '../../IdentifierType'
import Check from '../../nodeFns/check/Check'
import IdentifierDefinition from '../../nodeFns/IdentifierDefinition'
import CoreNodeDatas from '../../parseNode/CoreNodeDatas'
import CoreNodeType from '../../parseNode/CoreNodeType'
import getSubNodesRecursive from '../getSubNodesRecursive/getSubNodesRecursive'
import { mapGetOrSet } from 'map-get-or-set'
import SubNode from '../getSubNodesRecursive/SubNode'

const checkFile: Check<CoreNodeDatas[CoreNodeType.FILE]> = ({ nodeData, allNodeFns }) => {
  const subNodes = getSubNodesRecursive({
    allNodeFns,
    node: {
      type: { enum: CoreNodeType, id: CoreNodeType.FILE },
      data: nodeData
    }
  })
  const identifierDefinitions = subNodes
    .flatMap(({ index, node: { data, type } }) =>
      allNodeFns.get(type.enum)?.get(type.id)?.getIdentifierDefinitions?.(data)
        .map(({ node, index: identifierIndex }) => ({
          index: [...index, ...identifierIndex],
          node
        })))
    .filter((v): v is SubNode => v !== undefined)
    .filter(({ node: { data: { type } } }) => type === IdentifierType.AT)
  const nameMap: Map<string, IdentifierDefinition[]> = new Map()
  identifierDefinitions.forEach(identifierDefinition => {
    mapGetOrSet(nameMap, identifierDefinition.node.data.name, () => []).push(identifierDefinition)
  })

  console.log(subNodes, identifierDefinitions)

  return [...nameMap.entries()]
    .filter(([, identifierDefinitions]) => identifierDefinitions.length > 0)
    .map(([name, identifierDefinitions]) => ({
      message: `Duplicate identifier: @${name}`,
      locations: identifierDefinitions.map(({ index }) => index)
    }))
}

export default checkFile
