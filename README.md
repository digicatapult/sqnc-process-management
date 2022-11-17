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
process-management create -p 9944 -h localhost '[{"name":"A-test","version":1,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"SenderHasInputRole":{"index":0,"roleKey":"Supplier"}}},{"op":"and"},{"restriction":{"FixedOutputMetadataValueType":{"index":0,"metadataKey":"SomeMetadataKey","metadataValueType":"Literal"}}},{"restriction":{"FixedOutputMedataValueType":{"index":0,"metadataKey":"SomeOtherMetadataKey","metadataValueType":"File"}}},{"op":"and"},{"op":"and"}]}]'
```

## Library functions

The library functions of `dscp-process-management` take an optional `Options` object to configure the `Polkadot.js` API connection:

| variable | required |   default   | description                                                                                  |
| :------- | :------: | :---------: | :------------------------------------------------------------------------------------------- |
| API_HOST |    N     | `localhost` | The hostname of the `dscp-node` the API should connect to                                    |
| API_PORT |    N     |   `9944`    | The port of the `dscp-node` the API should connect to                                        |
| USER_URI |    N     |  `//Alice`  | The Substrate `URI` representing the private key to use when making `dscp-node` transactions |


For the full list of available restrictions see [`dscp-node`](https://github.com/digicatapult/dscp-node/blob/main/pallets/process-validation/src/restrictions.rs)

### Help

Returns all available commands
```sh
$ process-management 
Usage: process management [options] [command]

a command line interface for managing chain processes

Options:
  -v, --version              output current version
  -h, --help                 display help for command

Commands:
  create [options] <string>  A command for persisting process flows onto the chain
  disable                    A command for disabling an existing process flows. - NOT IMPLEMENTED
  help [command]             display help for command
```


### Create Process Command

```sh
#
# process-management help create
#
$ process-management help create
Usage: process management create [options] <string>

A command for persisting process flows onto the chain

Arguments:
  string             takes JSON as string example: '[{"name":"A test","version":2,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]},{"name":"B
                     test","version":2,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]}]'

Options:
  --dryRun            adding this flag it will not create a transaction and will return a result
  -h, --host <host>  substrate blockchain host address or FQDM, default - "localhost" (default: "localhost")
  -p, --port <port>  specify host port number if it is not a default, default - 9944 (default: "9944")
  -u, --user <user>  specify substrate blockhain user URI, default - "//Alice" (default: "//Alice")
  --print            print debugging info
  --help             display help for command

#
# process-management create -h localhost -p 9944 '[{"name":"A test","version":2,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]},{"name":"B test","version":2,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]}]'
#
$ process-management create -h localhost -p 9944 '[{"name":"B test","version":4,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]}]'

{"B test":{"message":"Transaction for new process B test has been successfully submitted","process":{"id":"0x422074657374","version":4,"status":"Enabled","program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]}}}
      
$ 

```

### Disable Process Command

```sh
$ process-management help disable
Usage: process management disable [options] <id> <version>

A command for disabling an existing process flows. Required process ID and version

Arguments:
  id                 a valid process id that you would like to disable
  version            a version number of a process

Options:
  --dryRun           to validate process and response locally before persisting on the chain, default - false
  -h, --host <host>  substrate blockchain host address or FQDM, default - "localhost" (default: "localhost")
  -p, --port <port>  specify host port number if it is not a default, default - 9944 (default: "9944")
  -u, --user <user>  specify substrate blockhain user URI, default - "//Alice" (default: "//Alice")
  --print            print debugging info
  --help             display help for command
$ 

#
# example
#

# let's create so we have something to disable
$ process-management create '[{"name":"B test","version":1,"program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]}]'
    
{"B test":{"message":"Transaction for new process B test has been successfully submitted","process":{"id":"0x422074657374","version":1,"status":"Enabled","program":[{"restriction":{"SenderOwnsAllInputs":{}}},{"restriction":{"None":{}}},{"op":"or"}]}}}
$

$ process-management disable "B test" '1'
attempting to disable:
ID:B test
Version:1
 command [disable] executed successfully: {"message":"Process has been disabled","process":{"id":"0x422074657374","version":1,"status":"Disabled"}}
$ 
```

### List Processes Command
```sh
$ process-management list --help
Usage: process management list [options]

A command for listing all active process flows

Options:
  -h, --host <host>  substrate blockchain host address or FQDM, default - "localhost" (default: "localhost")
  -p, --port <port>  specify host port number if it is not a default, default - 9944 (default: "9944")
  --active           returns only active process flows
  --disabled         returns only disabled process flows
  --print            print debugging info
  --help             display help for command

#
# examples
#

# --active
$ process-management list --active 
[
  {
    id: '0x732e69d9bee930b67c907ac97ef0deeac8e52635c16b266071d2f42211f485a1c8e677ed0f6c7a01b80a29e829baa5ee446d6f636b5f6163636570745f6f72646572d82c12285b5d4551f88e8f6e7eb52b8101000000',
    initialU8aLength: 13,
    registry: {},
    status: 'Enabled',
    program: [
      {
        restriction: {
          senderOwnsAllInputs: null
        }
      },
      {
        restriction: {
          senderHasInputRole: {
            index: 0,
            roleKey: "Supplier"
          }
        }
      },
      {
        op: "And"
      }
    ],
    createdAtHash: '0xc1f1730f66e2675c6397a1f50338c072f242669faadec1548f2bca751f6dc8ff'
  }
]

# --disabled
$ process-management list --disabled    
[
  {
    id: '0x732e69d9bee930b67c907ac97ef0deeac8e52635c16b266071d2f42211f485a17eee87b9b8852fc5e5a1611a1818848818422074657374d82c12285b5d4551f88e8f6e7eb52b8101000000',
    initialU8aLength: 8,
    registry: {},
    status: 'Disabled',
    program: [
            {
        restriction: {
          senderOwnsAllInputs: null
        }
      },
      {
        restriction: {
          senderHasInputRole: {
            index: 0,
            roleKey: "Supplier"
          }
        }
      },
      {
        op: "And"
      }
    ],
    createdAtHash: '0x4a3842f4d0428eabe10e74dfcfe15a65e1148b645bb39e3fd2fac3f190cb240c'
  },
]
$ 
```

```typescript
createProcess (
  name: string, // the name (processId) of the process to create. Max length 32 bytes
  version: number, // version number of the process. Must be `1` for a new process or one higher than the version of an existing process
  program: Process.Program, // an array of program steps. It can restriction or binary operator
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
