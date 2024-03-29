#!/usr/bin/env -S node --no-warnings

import fs from 'fs/promises'

import chalk from 'chalk'
import { Command } from 'commander'

import { loadProcesses, disableProcess, listTransforming } from './lib/process/index.js'
import { getAll } from './lib/process/api.js'
import cliVersion from './version.js'

const unwrap = <T, E>(res: Process.Result<T, E>): T => {
  if (res.type === 'ok') return res.result
  else throw res.error
}

const { log, dir } = console
const program = new Command()
const { red: r, blue: b } = {
  red: (txt: string) => chalk.redBright(txt),
  blue: (txt: string) => chalk.blueBright(txt),
}

const mapOptions = (options: Process.CLIOptions): Polkadot.Options => ({
  API_HOST: options.host,
  API_PORT: parseInt(options.port),
  USER_URI: options.user,
})

// TODO nice to have, a local config file for substrate host details e.g. name, port, address
// so no need to parse every time calling a command, or ability to set
program
  .name('process management')
  .description('a command line interface for managing chain processes')
  .version(cliVersion, '-v, --version', 'output current version')
  .helpOption('--help', 'display help for command') //override -h

program
  .command('list')
  .description('A command for listing all active process flows')
  .option('-v, --verbose', 'Returns all information about the transation, default - false')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('--raw', 'print processes with hex values and extra keys such as "createdAtHash"')
  .option('--active', 'returns only active process flows')
  .option('--disabled', 'returns only disabled process flows')
  .action(async (options: Process.CLIOptions) => {
    if (options.print)
      log(`
      retrieving all process flows from a chain...
      options: ${b(JSON.stringify(options))}
    `)
    try {
      const res: Process.RawPayload[] = await getAll(mapOptions(options))

      const transformed = listTransforming(res, options)
      dir(transformed, { depth: null })

      process.exit(0)
    } catch (err) {
      log(err)
      process.exit(1)
    }
  })

program
  .command('create')
  .description('A command for persisting process flows onto the chain')
  .option('--dryRun', 'to validate process and response locally before persisting on the chain, default - false')
  .option('--verbose', 'Returns all information about the transation, default - false')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .requiredOption('-f, --file <file>', 'path to file containing process flows to loads')
  .requiredOption('-u, --user <user>', 'specify substrate blockchain user URI')
  .action(async (options: Process.CLIOptions) => {
    if (options.print)
      log(`
      attempting to create a process...
      options: ${b(JSON.stringify(options))}
    `)
    const { dryRun, verbose } = options
    try {
      const data = (await fs.readFile(options.file)).toString('utf8')
      const loadResult = await loadProcesses({ data, dryRun, options: mapOptions(options), verbose })
      dir(loadResult.message, { depth: null })
      dir(unwrap(loadResult), { depth: null })
      process.exit(0)
    } catch (err) {
      log(err)
      process.exit(1)
    }
  })

program
  .command('disable')
  .description('A command for disabling an existing process flows. Required process ID and version')
  .option('--dryRun', 'to validate process and response locally before persisting on the chain, default - false')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .requiredOption('-u, --user <user>', 'specify substrate blockchain user URI')
  .argument('<id>', 'a valid process id that you would like to disable')
  .argument('<version>', 'a version number of a process')
  .action(async (id: string, version: string, options: Process.CLIOptions) => {
    if (options.print) log(`attempting to disable:\nID:${b(id)}\nVersion:${b(version)}`)
    try {
      const { dryRun } = options
      const res = unwrap(await disableProcess(id, parseInt(version), dryRun, mapOptions(options)))
      dir(res, { depth: null })

      process.exit(0)
    } catch (err) {
      log(err)
      process.exit(1)
    }
  })

program.parse()
if (!program.option) {
  program.help()
}

program.on('command:*', function () {
  log(`
    ${r('Invalid command: %s\nSee --help for a list of available commands.')}
    ${program.args.join(' ')}`)
  process.exit(127)
})
