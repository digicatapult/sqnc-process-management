import { buildApi } from '@digicatapult/dscp-node'
import * as vars from '../lib/env.js'

const { api } = buildApi({
  options: {
    apiHost: vars.API_HOST,
    apiPort: vars.API_PORT,
    metadataKeyLength: vars.METADATA_KEY_LENGTH,
    metadataValueLiteralLength: vars.METADATA_VALUE_LITERAL_LENGTH,
    processorIdentifierLength: vars.PROCESS_IDENTIFIER_LENGTH,
  },
})

api.on('disconnected', () => {
  console.log(
    `Disconnected from substrate node at ${vars.default.API_HOST}:${vars.default.API_PORT}`
  )
})

api.on('connected', () => {
  console.log(
    `Connected to substrate node at ${vars.default.API_HOST}:${vars.default.API_PORT}`
  )
})

api.on('error', (err) => {
  console.log(
    `Error from substrate node connection. Error was ${
      err.message || JSON.stringify(err)
    }`
  )
})

export default api
