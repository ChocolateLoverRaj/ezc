import { Command } from 'commander'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { readFileSync } from 'jsonfile'
import never from 'never'
import coreParseFileInput from '../core/parseNode/parseFile/coreInput'
import parseFile from '../core/parseNode/parseFile/parseFile'
import coreTryers from '../core/tryGetToken/coreTryers'
import parseAllTokens3 from '../core/tryGetToken/parseAllTokens3/parseAllTokens3'
import coreToStrInput from '../core/unparsedNodeToString/coreInput'
import unparsedNodeToString from '../core/unparsedNodeToString/unparsedNodeToString'
import unparseFile from '../core/unparseNode/unparseFile'
import getLineFromPos from '../util/getLineFromPos/getLineFromPos'

const { name, version, description } = readFileSync('./package.json')

new Command()
  .name(name)
  .version(version)
  .description(description)
  .argument('<inputFile>', 'File to parse')
  .option('-o <outputFile>', 'File to write to')
  .option('-p, --plugins <plugins...>', 'Plugins to extend LLVM IR')
  .action(async (file: string, { o, plugins }: { o: string, plugins: string[] }) => {
    console.log('Loading plugins')
    const loadedPlugins =
      await Promise.all(plugins.map(async plugin => (await import(plugin)).default))
    console.log('Loaded plugins', loadedPlugins)
    const stream = createReadStream(file, 'utf8')
    console.log('Parsing file')
    const tokensStream = parseAllTokens3(coreTryers)(stream)
    let index = 0
    let parseTokenError = false
    const parsedFile = await parseFile(coreParseFileInput)({
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
    if (o === undefined) {
      console.log('Not outputting a file because no output file inputted')
      return
    }
    console.log('Writing output file')
    await writeFile(o, unparsedNodeToString(coreToStrInput)(unparseFile(parsedFile.node.data)))
    console.log('Done')
  })
  .parse()
