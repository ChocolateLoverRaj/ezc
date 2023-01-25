import { PassThrough, Readable } from 'stream'

const splitStream = (stream: Readable): Readable => {
  const newStream = new PassThrough({ encoding: 'utf8' })
  stream.pipe(newStream)
  return newStream
}

export default splitStream
