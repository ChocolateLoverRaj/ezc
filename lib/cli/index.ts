import { Command } from 'commander'
import { createReadStream } from 'fs'
import { readFileSync } from 'jsonfile'
import never from 'never'
import coreInput from '../core/parseNode/parseFile/coreInput'
import parseFile from '../core/parseNode/parseFile/parseFile'
import coreTryers from '../core/tryGetToken/coreTryers'
import parseAllTokens3 from '../core/tryGetToken/parseAllTokens3/parseAllTokens3'
import getLineFromPos from './getLineFromPos'

const { name, version, description } = readFileSync('./package.json')

new Command()
  .name(name)
  .version(version)
  .description(description)
  .argument('<inputFile>', 'File to parse')
  .action(async (file: string) => {
    const stream = createReadStream(file, 'utf8')
    console.log('Parsing file')
    const tokensStream = parseAllTokens3(coreTryers)(stream)
    let index = 0
    let parseTokenError = false
    const parsedFile = await parseFile(coreInput)({
      async * [Symbol.asyncIterator] () {
        for await (const { error, value } of tokensStream) {
          if (error) {
            parseTokenError = true
            return
          }
          if (value.token !== undefined) {
            yield value.token
          }
          index += value.length
        }
      }
    })
    stream.destroy()
    if (parseTokenError) {
      const {
        line,
        characterInLine
      } = await getLineFromPos(createReadStream(file, 'utf8'), index) ?? never()
      console.log('Invalid token:', `${file}:${line + 1}:${characterInLine + 1}`)
      return
    }
    if (parsedFile === undefined) {
      console.log('Invalid file')
      return
    }
    console.log('Parsed file', parsedFile.node.data)
  })
  .parse()
