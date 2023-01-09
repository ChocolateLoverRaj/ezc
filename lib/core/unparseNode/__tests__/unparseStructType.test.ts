import CoreNodeType from '../../parseNode/CoreNodeType'
import coreInput from '../../unparsedNodeToString/coreInput'
import unparsedNodeToString from '../../unparsedNodeToString/unparsedNodeToString'
import unparseStructType from '../unparseStructType'

test('{ i64, ptr }', () => {
  expect(unparsedNodeToString(coreInput)(unparseStructType([{
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    },
    data: 64
  }, {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.POINTER_TYPE
    },
    data: undefined
  }]))).toMatchSnapshot()
})

test('{ i32 }', () => {
  expect(unparsedNodeToString(coreInput)(unparseStructType([{
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    },
    data: 32
  }]))).toMatchSnapshot()
})

test('{ i1, i64, ptr }', () => {
  expect(unparsedNodeToString(coreInput)(unparseStructType([{
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    },
    data: 1
  }, {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.INTEGER_TYPE
    },
    data: 64
  }, {
    type: {
      enum: CoreNodeType,
      id: CoreNodeType.POINTER_TYPE
    },
    data: undefined
  }]))).toMatchSnapshot()
})
