import CoreNodeDatas from '../parseNode/CoreNodeDatas'
import CoreNodeType from '../parseNode/CoreNodeType'
import UnparsedPart from './UnparsedPart'
import UnparsedPartType from './UnparsedPartType'
import UnparseNode from './UnparseNode'

const unparseInput: UnparseNode<CoreNodeDatas[CoreNodeType.INPUT]> = (
  { type, identifier, flags }
) => [
  {
    type: UnparsedPartType.NODE,
    data: type
  },
  ...flags.flatMap<UnparsedPart>(flag => [
    {
      type: UnparsedPartType.SPACE,
      data: undefined
    },
    {
      type: UnparsedPartType.NODE,
      data: flag
    }
  ]),
  ...identifier !== undefined
    ? [
        {
          type: UnparsedPartType.SPACE,
          data: undefined
        },
        {
          type: UnparsedPartType.NODE,
          data: identifier
        }
      ]
    : [] as any
]

export default unparseInput
