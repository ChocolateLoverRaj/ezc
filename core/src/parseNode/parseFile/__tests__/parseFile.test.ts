import { createReadStream } from 'fs'
import { join } from 'path'
import coreTryers from '../../../tryGetToken/coreTryers'
import parseAllTokens from '../../../tryGetToken/parseAllTokens'
import coreInput from '../coreInput'
import parseFile from '../parseFile'
import { dirname } from 'dirname-filename-esm'

// eslint-disable-next-line @typescript-eslint/naming-convention
const __dirname = dirname(import.meta)

test('hello world example', async () => {
  await expect(parseFile(coreInput)(
    parseAllTokens(coreTryers)(createReadStream(
      join(__dirname, '../../../../../samples/llvm/hello-world/main.ll'), 'utf8')
    ) as any)).resolves.toMatchSnapshot()
})
