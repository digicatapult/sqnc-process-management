export const utf8ToHex = (str: string): Process.Hex => {
  const buffer = Buffer.from(str, 'utf8')
  const bufferHex = buffer.toString('hex')
  return `0x${bufferHex}`
}

export const hexToUtf8 = (str: Process.Hex) => {
  const stripped = str.substring(2)
  return Buffer.from(stripped, 'hex').toString('utf8')
}
