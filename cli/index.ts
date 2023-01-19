import { Command } from 'commander'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import { readFileSync } from 'jsonfile'
import never from 'never'
import parseAllTokens3 from '../core/tryGetToken/parseAllTokens3/parseAllTokens3'
import parseIdentifier from '../core/tryGetToken/parseIdentifier'
import parseIntegerType from '../core/tryGetToken/parseIntegerType'
import coreInput from '../core/tryGetToken/parseKeyword/coreInput'
import parseKeyword from '../core/tryGetToken/parseKeyword/parseKeyword'
import parseNumberLiteral from '../core/tryGetToken/parseNumberLiteral'
import parseStringLiteral from '../core/tryGetToken/parseStringLiteral'
import coreToStrInput from '../core/unparsedNodeToString/coreInput'
import unparsedNodeToString from '../core/unparsedNodeToString/unparsedNodeToString'
import unparseFile from '../core/unparseNode/unparseFile'
import { concat } from 'concat-maps'
import Plugin from './Plugin'
import countLineLengths from '../util/countLineLengths/countLineLengths'
import arrayFromAsync from '../util/arrayFromAsync/arrayFromAsync'
import splitStream from '../util/splitStream/splitStream'
import logTree from 'console-log-tree'
import EnumItem from '../core/EnumItem'
import ParsedNodeError from '../core/parseNode/ParseNodeError'
import PosInLine from '../util/getPosInLine/PosInLine'
import getPosInLine from '../util/getPosInLine/getPosInLine'
import { EOL } from 'os'
import getStrIndexFromTokenIndex from './getStrIndexFromTokenIndex/getStrIndexFromTokenIndex'
import parseFileWithUnknownTokens from './parseFileWithUnknownTokens/parseFileWithUnknownTokens'

const { name, version, description } = readFileSync('./package.json')

new Command()
  .name(name)
  .version(version)
  .description(description)
  .argument('<inputFile>', 'File to parse')
  .option('-o <outputFile>', 'File to write to')
  .option('-p, --plugins <plugins...>', 'Plugins to extend LLVM IR', [])
  .action(async (file: string, { o, plugins }: { o: string, plugins: string[] }) => {
    console.log('Loading plugins')
    const loadedPlugins: Plugin[] =
      await Promise.all(plugins.map(async plugin => (await import(plugin)).default))
    console.log('Loaded plugins', loadedPlugins)
    const stream = createReadStream(file, 'utf8')
    console.log('Parsing file')
    const tokensStream = parseAllTokens3([
      parseIntegerType,
      parseKeyword(
        concat(coreInput, ...loadedPlugins.map(({ stringToKeyWordMap }) => stringToKeyWordMap))),
      parseStringLiteral,
      parseIdentifier,
      parseNumberLiteral
    ])(splitStream(stream))
    const lineLengthsPromise = arrayFromAsync(countLineLengths(splitStream(stream)))
    const {
      index,
      parseFileResult,
      parseTokenError,
      tokenLengths
    } = await parseFileWithUnknownTokens(tokensStream)

    // Destroy stream in case tokens stream has an error and file isn't completely read
    stream.destroy()
    const getFileLink = ({ line, characterInLine }: PosInLine): string =>
      `${file}:${line + 1}:${characterInLine + 1}`
    if (parseTokenError) {
      const posInLine = getPosInLine(EOL.length, await lineLengthsPromise, index) ?? never()
      console.log('Invalid token:', getFileLink(posInLine))
      return
    }
    if (!parseFileResult.success) {
      console.log('Invalid file')
      const lineLengths = await lineLengthsPromise
      const errorResultToTree = (
        indexBefore: number,
        { message, subAttempts, index }: ParsedNodeError<EnumItem>
      ): logTree.Tree => {
        const pos = indexBefore + index
        return {
          name: `${getFileLink(
            getPosInLine(
              EOL.length,
              lineLengths,
              getStrIndexFromTokenIndex(tokenLengths, pos) ?? never()
            ) ?? never())} - ${message}`,
          children: subAttempts?.map(subAttempt => errorResultToTree(pos, subAttempt))
        }
      }
      logTree.log(errorResultToTree(0, parseFileResult.result))
      return
    }
    if (o === undefined) {
      console.log('Not outputting a file because no output file inputted')
      return
    }
    console.log('Writing output file')
    await writeFile(o, unparsedNodeToString(coreToStrInput)(
      unparseFile(parseFileResult.result.node.data)))
    console.log('Done')
  })
  .parse()
