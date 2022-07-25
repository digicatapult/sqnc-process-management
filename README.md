# dscp-process-management

A Library for managing restricted process flows in `DSCP`.

## Getting started

For the basic application to work and for locally run tests to work `docker-compose up` must be run.

The build command should be run first to create the converted ts files.

```shell
npm run build
```

To start the basic application

```shell
npm run start
```

To run the tests

```shell
npm run test
npm run test:unit
```

To run the application in dev mode with a nodemon watcher

```shell
npm run dev
```

## Library functions

The library functions of `dscp-process-management` take an optional `Options` object to configure the `Polkadot.js` API connection:

| variable | required |   default   | description                                                                                  |
| :------- | :------: | :---------: | :------------------------------------------------------------------------------------------- |
| API_HOST |    N     | `localhost` | The hostname of the `dscp-node` the API should connect to                                    |
| API_PORT |    N     |   `9944`    | The port of the `dscp-node` the API should connect to                                        |
| USER_URI |    N     |  `//Alice`  | The Substrate `URI` representing the private key to use when making `dscp-node` transactions |

Restrictions are provided as JSON in the format `{ RestrictionName: [RestrictionValue] } `. For example:

```json
{
  "SenderOwnsAllInputs": [], // some restrictions do not require a value
  "SenderHasInputRole": [
    {
      "index": 0,
      "roleKey": "Supplier"
    }
  ],
  "FixedInputMetadataValue": [
    {
      "index": 0,
      "metadataKey": "Type",
      "metadataValue": {
        "Literal": "ORDER"
      }
    }
  ],
  "FixedOutputMetadataValueType": [
    // the same restriction can be added multiple times with different values
    {
      "index": 0,
      "metadataKey": "SomeMetadataKey",
      "metadataValueType": "Literal"
    },
    {
      "index": 0,
      "metadataKey": "SomeOtherMetadataKey",
      "metadataValueType": "Literal"
    }
  ]
}
```

For the full list of available restrictions see [`dscp-node`](https://github.com/digicatapult/dscp-node/blob/main/pallets/process-validation/src/restrictions.rs)

### Create Process

```typescript
createProcess (
  name: string, // the name (processId) of the process to create. Max length 32 bytes
  version: number, // version number of the process. Must be `1` for a new process or one higher than the version of an existing process
  rawRestrictions: string, // JSON of the process restrictions
  dryRun: boolean, // Optional - defaults to false. Shows the expected result of creating the process, without actually running the transaction
  options: Options // Optional - Polkadot API options
)
```

### Disable Process

```typescript
disableProcess (
  name: string, // the name (processId) of the process to disable. Max length 32 bytes
  version: number, // version number of the process to disable.
  dryRun: boolean, // Optional - defaults to false. Shows the expected result of disabling the process, without actually running the transaction
  options: Options // Optional - Polkadot API options
)
```
