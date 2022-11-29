#!/usr/bin/env node --no-warnings

import chalk from 'chalk'
import { Command } from 'commander'

import { loadProcesses, disableProcess } from './lib/process/index.js'
import { formatProcess, getAll } from './lib/process/api.js'
import cliVersion from './version.js'

const { log, dir } = console
const program = new Command()
const {
  red: r,
  blue: b,
  green: g,
} = {
  red: (txt: string) => chalk.redBright(txt),
  green: (txt: string) => chalk.green(txt),
  blue: (txt: string) => chalk.blueBright(txt),
}
const example: string = JSON.stringify([
  {
    name: 'A test',
    version: 2,
    program: [{ restriction: { SenderOwnsAllInputs: {} } }, { restriction: { None: {} } }, { op: 'or' }],
  },
  {
    name: 'B test',
    version: 2,
    program: [{ restriction: { SenderOwnsAllInputs: {} } }, { restriction: { None: {} } }, { op: 'or' }],
  },
])

const mapOptions = (options: Process.CLIOptions): Polkadot.Options => ({
  API_HOST: options.host,
  API_PORT: parseInt(options.port),
  USER_URI: options.user,
})

// TODO nice to have, a local config file for substrate host details e.g. name, port, address
// so no need to parse everytime calling a command, or ability to set
program
  .name('process management')
  .description('a command line interface for managing chain processes')
  .version(cliVersion, '-v, --version', 'output current version')

program
  .command('list')
  .description('A command for listing all active process flows')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('--raw', 'print processes with hex values and extra keys such as "createdAtHash"')
  .option('--active', 'returns only active process flows')
  .option('--disabled', 'returns only disabled process flows')
  .option('--print', 'print debugging info')
  .action(async (options: Process.CLIOptions) => {
    if (options.print)
      log(`
      retrieving all process flows from a chain...
      options: ${b(JSON.stringify(options))}
    `)
    try {
      const res: Process.RawPayload[] = await getAll(mapOptions(options))
      const { raw, active, disabled } = options

      let processes: Process.RawPayload[]
      if (active) {
        processes = res.filter(({ status }) => status === 'Enabled')
      } else if (disabled) {
        processes = res.filter(({ status }) => status === 'Disabled')
      } else {
        processes = res
      }

      if (raw) {
        dir(processes, { depth: null })
      } else {
        dir(
          processes.map((p) => formatProcess(p)),
          { depth: null }
        )
      }

      process.exit(0)
    } catch (err) {
      log(err)
      program.help()
    }
  })

program
  .command('create')
  .description('A command for persisting process flows onto the chain')
  .option('--dryRun', 'to validate process and response locally before persisting on the chain, default - false')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('-u, --user <user>', 'specify substrate blockchain user URI, default - "//Alice"', '//Alice')
  .option('--print', 'print debugging info')
  .argument('<json>', `takes JSON as string example: '${example}'`)
  .action(async (data: string, options: Process.CLIOptions) => {
    if (options.print)
      log(`
      attempting to create a process...
      options: ${b(JSON.stringify(options))}
      program: ${b(data)}
    `)
    const { dryRun } = options
    try {
      const res: Process.Response = await loadProcesses({ data, dryRun, options: mapOptions(options) })
      log(JSON.stringify(res))
      process.exit(0)
    } catch (err) {
      log(err)
      program.help()
    }
  })

program
  .command('disable')
  .description('A command for disabling an existing process flows. Required process ID and version')
  .option('--dryRun', 'to validate process and response locally before persisting on the chain, default - false')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('-u, --user <user>', 'specify substrate blockhain user URI, default - "//Alice"', '//Alice')
  .option('--print', 'print debugging info')
  .argument('<id>', 'a valid process id that you would like to disable')
  .argument('<version>', 'a version number of a process')
  .action(async (id: string, version: string, options: Process.CLIOptions) => {
    if (options.print) log(`attempting to disable:\nID:${b(id)}\nVersion:${b(version)}`)
    try {
      const { dryRun } = options
      const res: Process.Result = await disableProcess(id, parseInt(version), dryRun, mapOptions(options))
      log(JSON.stringify(res))

      process.exit(0)
    } catch (err) {
      log(err)
      program.help()
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
  process.exit(110)
})
