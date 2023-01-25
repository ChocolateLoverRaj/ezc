import { Command } from 'commander'
import { createReadStream } from 'fs'
import { writeFile } from 'fs/promises'
import jsonFile from 'jsonfile'
import never from 'never'
import parseAllTokens3 from 'ezc/dist/tryGetToken/parseAllTokens3/parseAllTokens3.js'
import parseIdentifier from 'ezc/dist/tryGetToken/parseIdentifier.js'
import parseIntegerType from 'ezc/dist/tryGetToken/parseIntegerType.js'
import coreInput from 'ezc/dist/tryGetToken/parseKeyword/coreInput.js'
import parseKeyword from 'ezc/dist/tryGetToken/parseKeyword/parseKeyword.js'
import parseNumberLiteral from 'ezc/dist/tryGetToken/parseNumberLiteral.js'
import parseStringLiteral from 'ezc/dist/tryGetToken/parseStringLiteral.js'
import coreToStrInput from 'ezc/dist/unparsedNodeToString/coreInput.js'
import unparsedNodeToString from 'ezc/dist/unparsedNodeToString/unparsedNodeToString.js'
import unparseFile from 'ezc/dist/unparseNode/unparseFile.js'
import { concat } from 'concat-maps'
import Plugin from './Plugin'
import countLineLengths from 'util/dist/countLineLengths/countLineLengths.js'
import arrayFromAsync from 'util/dist/arrayFromAsync/arrayFromAsync.js'
import splitStream from 'util/dist/splitStream/splitStream.js'
import logTree from 'console-log-tree'
import EnumItem from 'ezc/dist/EnumItem'
import ParsedNodeError from 'ezc/dist/parseNode/ParseNodeError.js'
import PosInLine from 'util/dist/getPosInLine/PosInLine.js'
import getPosInLine from 'util/dist/getPosInLine/getPosInLine.js'
import { EOL } from 'os'
import getStrIndexFromTokenIndex from './getStrIndexFromTokenIndex/getStrIndexFromTokenIndex'
import parseFileWithUnknownTokens from './parseFileWithUnknownTokens/parseFileWithUnknownTokens'
import { join } from 'path'

const { name, version, description } = jsonFile.readFileSync('./package.json')

new Command()
  .name(name)
  .version(version)
  .description(description)
  .argument('<inputFile>', 'File to parse')
  .option('-o <outputFile>', 'File to write to')
  .option('-p, --plugins <plugins...>', 'Plugins to extend LLVM IR', [])
  .action(async (file: string, { o, plugins }: { o: string, plugins: string[] }) => {
    const loadedPlugins: Plugin[] = await Promise.all(plugins.map(async plugin =>
      (await import(join(process.cwd(), plugin))).default))
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
      logTree.log(errorResultToTree(0, parseFileResult.result as ParsedNodeError<EnumItem>))
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
