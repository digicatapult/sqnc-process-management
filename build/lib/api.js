import { buildApi } from '@digicatapult/dscp-node';
import option from './options.ts';
const { api } = buildApi({
    options: {
        apiHost: option.API_HOST,
        apiPort: option.API_PORT,
        metadataKeyLength: option.METADATA_KEY_LENGTH,
        metadataValueLiteralLength: option.METADATA_VALUE_LITERAL_LENGTH,
        processorIdentifierLength: option.PROCESS_IDENTIFIER_LENGTH,
    },
});
api.on('disconnected', () => {
    console.log(`Disconnected from substrate node at ${option.API_HOST}:${option.API_PORT}`);
});
api.on('connected', () => {
    console.log(`Connected to substrate node at ${option.API_HOST}:${option.API_PORT}`);
});
api.on('error', (err) => {
    console.log(`Error from substrate node connection. Error was ${err.message || JSON.stringify(err)}`);
});
export default api;
