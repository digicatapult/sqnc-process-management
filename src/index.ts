#!/usr/bin/env node --no-warnings

import chalk from 'chalk'
import { Command } from 'commander'

import { loadProcesses, disableProcess } from './lib/process/index.js'
import version from './version.js'

const { log } = console
const program = new Command()
const { red: r, blue: b, green: g, yellow: y } = {
  red: (txt: string) => chalk.redBright(txt),
  green: (txt: string) => chalk.green(txt),
  yellow: (txt: string) => chalk.yellow(txt),
  blue: (txt: string) => chalk.blueBright(txt),
}
const example: string = JSON.stringify([{
  name: 'A test',
  version: 2,
  program: [    
    { restriction: { SenderOwnsAllInputs: {} }} ,
    { restriction: { None: {} }},
    { op: 'or' },
  ],
},  {
  name: 'B test',
version: 2,
program: [    
  { restriction: { SenderOwnsAllInputs: {} }} ,
  { restriction: { None: {} }}, 
  { op: 'or' },
],
}])
 
program
  .name('process management')
  .description('a command line interface for managing chain processes')
  .version(version, '-v, --version', 'output current version')

program.command('create')
  .description('A command for persisting process flows onto the chain')
  .option('--dryRun', 'to validate process and response locally before persisting on the chain, default - false')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('-u, --user <user>', 'specify substrate blockhain user URI, default - "//Alice"', '//Alice')
  .argument('<string>', `takes JSON as string example: '${example}'`)
  .action(async (data: string, options: { dryRun: boolean, port: string, user: string, host: string }) => {
    log(`
      attempting to create a process...
      options: ${b(JSON.stringify(options))}
      program: ${b(data)}
    `)
    const { dryRun, ...rest } = options
    try {
      const res: Process.Response = await loadProcesses({ data, dryRun, options: {
          API_HOST: rest.host,
          API_PORT: parseInt(rest.port),
          USER_URI: rest.user,
        } 
      })
      log(` ${g('command [create] executed successfully')}: ${JSON.stringify(res)}`)
      process.exit(1)
      
    } catch (err){
      log(`Exception has been caught: ${r(JSON.stringify(err))}`)
      program.help()
    }
  })

program.command('disable')
  .description('A command for disabling an existing process flows. Required process ID and version')
  .argument('<id>', 'a valid process id that you would like to disable')
  .argument('<version>', 'a version number of a process')
  .action(async (data: string, opt: any) => {
    log(`attempting to disable ${b(data)}`)
    try {
      const res: any = await disableProcess('a', 1)
      log(` ${g('command [disable] executed successfully')}: ${JSON.stringify(res)}`)

      process.exit(1)
    } catch (err) {
      log(`Exception has been caught: ${r(JSON.stringify(err))}`)
      program.help()
    }
    log('not implemented', { data, opt })
  })

program.parse()
if (!program.option) {
  program.help()
}

program.on('command:*', function () {
  log(`
    ${r('Invalid command: %s\nSee --help for a list of available commands.')}
    ${program.args.join(' ')}`
  )
  process.exit(1)
})
