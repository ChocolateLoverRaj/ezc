import EnumItem from '../EnumItem'
import CoreNodesWithData from './CoreNodesWithData'
import CoreNodeType from './CoreNodeType'
import FunctionTypeData from './FunctionTypeData'
import Linkage from './Linkage'

interface CoreNodeDatas {
  [CoreNodeType.FUNCTION]: {
    name: string
    inputNames: string[]
    type: FunctionTypeData
    inside: any
  }
  [CoreNodeType.DECLARE]: {
    name: string
    type: FunctionTypeData
  }
  [CoreNodeType.TYPE]: {
    type: EnumItem
    data: any
  }
  [CoreNodeType.VARIABLE]: {
    global: boolean
    constant: boolean
    align: number | undefined
    unnamed_addr: boolean
    linkage: Linkage
    name: string
    type: CoreNodesWithData[CoreNodeType.TYPE]
    value: any
  }
  [CoreNodeType.STRING]: string
}

export default CoreNodeDatas
