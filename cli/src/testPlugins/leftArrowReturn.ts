import CoreKeyWord from 'ezc/dist/CoreKeyWord.js'
import Plugin from '../Plugin.js'

const plugin: Plugin = {
  stringToKeyWordMap: new Map([
    ['<', { enum: CoreKeyWord, id: CoreKeyWord.RETURN }]
  ])
}

export default plugin
