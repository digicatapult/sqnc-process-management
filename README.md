# dscp-process-management

To start the basic application

```shell
npm run start
```

To run the tests

```shell
npm run test
```

To run the application in dev mode with a nodemon watcher

```shell
npm run dev
```

Building an API with `@digicatapult/dscp-node` uses the `option` object:

```js
import { buildApi } from '@digicatapult/dscp-node'
import option from './options.ts'

const { api } = buildApi({
  options: {
    apiHost: option.API_HOST,
    apiPort: option.API_PORT,
    metadataKeyLength: option.METADATA_KEY_LENGTH,
    metadataValueLiteralLength: option.METADATA_VALUE_LITERAL_LENGTH,
    processorIdentifierLength: option.PROCESS_IDENTIFIER_LENGTH,
  },
})
```

The following `options` can be configured:
| variable | required | default | description |
| :------------------------- | :------: | :---------------------------------------------------: | :-------------------------------------------------------------------- |
| apiHost | N | `localhost` | The hostname of the `dscp-node` the API should connect to |
| apiPort | N | `9944` | The port of the `dscp-node` the API should connect to |
| metadataKeyLength | N | `32` | Fixed length of `dscp-node` metadata key type |
| metadataValueLiteralLength | N | `32` | Fixed length of `dscp-node` metadata `LITERAL` value type |
| processorIdentifierLength | N | `32` | Fixed length of `dscp-node` process identifier type |
