# sqnc-process-management

A Library for managing restricted process flows in the `Sequence` (SQNC) ledger-based system.

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

To install npm CLI tool. It will be linked to local binaries so can be executed as `process-management`

```shell
npm i -g
```

## using CLI

```sh
process-management help
```

### Options

`sqnc-process-management` takes the following arguments to configure the `Polkadot.js` API connection:

| variable | required |   default   | description                                                                                                           |
| :------- | :------: | :---------: | :-------------------------------------------------------------------------------------------------------------------- |
| `host`   |    N     | `localhost` | The hostname of the `sqnc-node` the API should connect to                                                             |
| `port`   |    N     |   `9944`    | The port of the `sqnc-node` the API should connect to                                                                 |
| `user`   |    Y     |      -      | The Substrate `URI` representing the private key to use when making `sqnc-node` transactions. `//Alice` for dev chain |

For the full list of available restrictions see [`sqnc-node`](https://github.com/digicatapult/sqnc-node/blob/main/pallets/process-validation/src/restrictions.rs)

### Help

Returns all available commands

```sh
$ process-management
Usage: process management [options] [command]

a command line interface for managing chain processes

Options:
  -v, --version                     output current version
  --help                            display help for command

Commands:
  list [options]                    A command for listing all active process flows
  create [options] <json>           A command for persisting process flows onto the chain
  disable [options] <id> <version>  A command for disabling an existing process flows. Required process ID and version
  help [command]                    display help for command
```

### Create Process Command

```sh
$ process-management help create
Usage: process management create [options] <json>

A command for persisting process flows onto the chain

Options:
  --dryRun           to validate process and response locally before persisting on the chain, default - false
  --verbose          Returns all information about the transation, default - false
  -h, --host <host>  substrate blockchain host address or FQDM, default - "localhost" (default: "localhost")
  -p, --port <port>  specify host port number if it is not a default, default - 9944 (default: "9944")
  -f, --file <file>  path to file containing process flows to loads
  -u, --user <user>  specify substrate blockchain user URI
  --help             display help for command

#
# example
#

$ process-management create -h localhost -p 9944 -u //Alice '[{"name":"A test","version":1,"program":[{"restriction":{"FixedNumberOfOutputs":{"numOutputs":1}}},{"restriction":{"None":{}}},{"op":"Or"}]}]'

{
  'A test': {
    message: 'Transaction for new process A test has been successfully submitted',
    process: {
      id: 'A test',
      version: 1,
      status: 'Enabled',
      program: [
        { restriction: { FixedNumberOfOutputs: { numOutputs: 1 } } },
        { restriction: { None: {} } },
        { op: 'Or' }
      ]
    }
  }
}
```

Or use a `.json` file

```
process-management create -h localhost -p 9944 -u //Alice "$(cat exampleProcess.json)"
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
  --print            print debugging info
  -u, --user <user>  specify substrate blockchain user URI
  --help             display help for command

#
# example
#

# let's create so we have something to disable
$ process-management create -u //Alice -f ./exampleProcess.json

{
  'B test': {
    message: 'Transaction for new process B test has been successfully submitted',
    process: {
      id: 'B test',
      version: 1,
      status: 'Enabled',
      program: [
        { restriction: { FixedNumberOfOutputs: { numOutputs: 1 } } },
        { restriction: { None: {} } },
        { op: 'Or' }
      ]
    }
  }
}

$ process-management disable -u //Alice 'B test' '1'

{
  message: 'Process has been disabled',
  process: { id: 'B test', version: 1, status: 'Disabled' }
}
```

### List Processes Command

```sh
$ process-management list --help
Usage: process management list [options]

A command for listing all active process flows

Options:
  -h, --host <host>  substrate blockchain host address or FQDM, default - "localhost" (default: "localhost")
  -p, --port <port>  specify host port number if it is not a default, default - 9944 (default: "9944")
  --raw              print processes with hex values and extra keys such as "createdAtHash"
  --active           returns only active process flows
  --disabled         returns only disabled process flows
  --print            print debugging info
  --help             display help for command

#
# example
#

$ process-management list --active
[
  {
    id: 'default',
    version: 1,
    status: 'Enabled',
    program: [ { restriction: { none: null } } ]
  }
]
```

## Running tests

Unit tests can be run without docker using:

```shell
npm run test:unit
```

Running the integration test suite requires docker to be installed. Tests can then be executed with:

```shell
npm run test
```

If you want to see output from the `sqnc-node` container brought up with `testcontainers` run:

```shell
 DEBUG=testcontainers* npm run test
```
