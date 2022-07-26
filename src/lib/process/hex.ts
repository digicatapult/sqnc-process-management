export const utf8ToHex = (str: string, len: number) => {
  const buffer = Buffer.from(str, 'utf8')
  const bufferHex = buffer.toString('hex')
  if (bufferHex.length > 2 * len) {
    throw new Error(`${str} is too long. Max length: ${len} bytes`)
  }
  return `0x${bufferHex}`
}
