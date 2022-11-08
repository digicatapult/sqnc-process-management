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
npm run local
```

To run the tests

```shell
npm run test
npm run test:unit
```

To install npm CLI tool. It will be linked to local binaries so can be executed as `process-management`
```shell
npm i -g

# using CLI
process-management help

# example
process-management create -p 9944 -h paulius.local '[{}]'
```

## Library functions

The library functions of `dscp-process-management` take an optional `Options` object to configure the `Polkadot.js` API connection:

| variable | required |   default   | description                                                                                  |
| :------- | :------: | :---------: | :------------------------------------------------------------------------------------------- |
| API_HOST |    N     | `localhost` | The hostname of the `dscp-node` the API should connect to                                    |
| API_PORT |    N     |   `9944`    | The port of the `dscp-node` the API should connect to                                        |
| USER_URI |    N     |  `//Alice`  | The Substrate `URI` representing the private key to use when making `dscp-node` transactions |

Restrictions are provided as JSON in the format `{ RestrictionName: [RestrictionValue] } `. For example:

```
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
    // the same restriction type can be added multiple times with different values
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

Takes multiple options which be parsed when initiating a new instance of `polkadot` API. Also, it takes a `dryRun` [true, false] which is basically a tests run that won't be executed against blockchain, default value is false

```sh
# commander CLI interface
$ process-management help
  ____                                                ____   _       ___ 
 |  _ \   _ __    ___     ___    ___   ___   ___     / ___| | |     |_ _|
 | |_) | | '__|  / _ \   / __|  / _ \ / __| / __|   | |     | |      | | 
 |  __/  | |    | (_) | | (__  |  __/ \__ \ \__ \   | |___  | |___   | | 
 |_|     |_|     \___/   \___|  \___| |___/ |___/    \____| |_____| |___|
                                                                         
Usage: process management [options] [command]

a command line interface for managing chain processes

Options:
  -V, --version              output the version number
  -h, --help                 display help for command

Commands:
  create [options] <string>  A command for persisting process flows onto the chain
  disable
  help [command]             display help for command

# example of nothing to process result
$ process-management create -p 9944 -h paulius.local '[{}]'
  ____                                                ____   _       ___ 
 |  _ \   _ __    ___     ___    ___   ___   ___     / ___| | |     |_ _|
 | |_) | | '__|  / _ \   / __|  / _ \ / __| / __|   | |     | |      | | 
 |  __/  | |    | (_) | | (__  |  __/ \__ \ \__ \   | |___  | |___   | | 
 |_|     |_|     \___/   \___|  \___| |___/ |___/    \____| |_____| |___|
                                                                         
parsed options:  {
  options: { dryRun: false, host: 'paulius.local', port: '9944', user: '//Alice' }
}
{ res: 'Error occured: Error: nothing to process' }
```

```typescript
createProcess (
  name: string, // the name (processId) of the process to create. Max length 32 bytes
  version: number, // version number of the process. Must be `1` for a new process or one higher than the version of an existing process
  prgoram: Process.Program, // an array of restrictions and binary operators
  dryRun: boolean, // Optional - defaults to false. Shows the expected result of creating the process, without actually running the transaction
  options: Polkadot.Options // Optional - Polkadot API options
)
```

### Disable Process

```typescript
disableProcess (
  name: string, // the name (processId) of the process to disable. Max length 32 bytes
  version: number, // version number of the process to disable.
  dryRun: boolean, // Optional - defaults to false. Shows the expected result of disabling the process, without actually running the transaction
  options: Polkadot.Options // Optional - Polkadot API options
)
```
