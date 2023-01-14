import CoreKeyWord from '../../core/CoreKeyWord'
import Plugin from '../Plugin'

const plugin: Plugin = {
  stringToKeyWordMap: new Map([
    ['<', { enum: CoreKeyWord, id: CoreKeyWord.RETURN }]
  ])
}

export default plugin
