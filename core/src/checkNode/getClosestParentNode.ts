import EnumItemWithData from '../EnumItemWithData'

const getClosestParentNode = <T extends EnumItemWithData>(
  parentNodes: readonly EnumItemWithData[],
  type: T['type']
): T['data'] | undefined =>
    [...parentNodes]
      .reverse()
      .find(({ type: currentType }) => currentType.enum === type.enum && currentType.id === type.id)
      ?.data

export default getClosestParentNode
