# dscp-process-management

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

The following `options` can be configured:

| variable | required |   default   | description                                                                                  |
| :------- | :------: | :---------: | :------------------------------------------------------------------------------------------- |
| API_HOST |    N     | `localhost` | The hostname of the `dscp-node` the API should connect to                                    |
| API_PORT |    N     |   `9944`    | The port of the `dscp-node` the API should connect to                                        |
| USER_URI |    N     |  `//Alice`  | The Substrate `URI` representing the private key to use when making `dscp-node` transactions |

//TODO
// document library functions
// createProcess
// disableProcess
