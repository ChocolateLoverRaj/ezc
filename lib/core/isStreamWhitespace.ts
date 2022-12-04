const isStreamWhitespace = async (stream: AsyncIterable<string>): Promise<boolean> => {
  for await (const chunk of stream) {
    if (chunk.trim().length > 0) return false
  }
  return true
}

export default isStreamWhitespace
