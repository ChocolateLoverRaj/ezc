import CoreKeyWord from '../../CoreKeyWord'
import CoreTokenType from '../../CoreTokenType'
import CoreInputFlag from '../../parseNode/CoreInputFlag'
import CoreNodeType from '../../parseNode/CoreNodeType'
import UnparsedPartType from '../../unparseNode/UnparsedPartType'
import coreInput from '../coreInput'
import unparsedNodeToString from '../unparsedNodeToString'

test('one line', () => {
  expect(unparsedNodeToString(coreInput)([{
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.STRING_LITERAL
      },
      data: 'Hello'
    }
  }, {
    type: UnparsedPartType.SPACE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.STRING_LITERAL
      },
      data: 'World'
    }
  }])).toMatchSnapshot()
})

test('sub node', () => {
  expect(unparsedNodeToString(coreInput)([{
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.INTEGER_TYPE
      },
      data: 32
    }
  }, {
    type: UnparsedPartType.SPACE,
    data: undefined
  }, {
    type: UnparsedPartType.NODE,
    data: {
      type: {
        enum: CoreNodeType,
        id: CoreNodeType.INPUT_FLAG
      },
      data: {
        enum: CoreInputFlag,
        id: CoreInputFlag.NO_CAPTURE
      }
    }
  }])).toMatchSnapshot()
})

test('new line', () => {
  expect(unparsedNodeToString(coreInput)([{
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 60
    }
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 120
    }
  }])).toMatchSnapshot()
})

test('indenting', () => {
  expect(unparsedNodeToString(coreInput)([{
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.OPEN_BRACKET
      }
    }
  }, {
    type: UnparsedPartType.INDENT,
    data: undefined
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 7
    }
  }, {
    type: UnparsedPartType.UNINDENT,
    data: undefined
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.CLOSE_BRACKET
      }
    }
  }])).toMatchSnapshot()
})

test('nested indenting', () => {
  expect(unparsedNodeToString(coreInput)([{
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.OPEN_BRACKET
      }
    }
  }, {
    type: UnparsedPartType.INDENT,
    data: undefined
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.OPEN_BRACKET
      }
    }
  }, {
    type: UnparsedPartType.INDENT,
    data: undefined
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.NUMBER_LITERAL
      },
      data: 6969
    }
  }, {
    type: UnparsedPartType.UNINDENT,
    data: undefined
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.CLOSE_BRACKET
      }
    }
  }, {
    type: UnparsedPartType.UNINDENT,
    data: undefined
  }, {
    type: UnparsedPartType.NEW_LINE,
    data: undefined
  }, {
    type: UnparsedPartType.TOKEN,
    data: {
      type: {
        enum: CoreTokenType,
        id: CoreTokenType.KEY_WORD
      },
      data: {
        enum: CoreKeyWord,
        id: CoreKeyWord.CLOSE_BRACKET
      }
    }
  }])).toMatchSnapshot()
})
