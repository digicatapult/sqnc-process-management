#!/usr/bin/env node 

import chalk from 'chalk'
import { Command } from 'commander'

import { loadProcesses } from './lib/process/index.js'

const { log } = console
const version = '1.4.0'
const program = new Command()
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
  .option('--dryRun', 'will not create a transaction and will run just against local chain')
  .option('-h, --host <host>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <port>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('-u, --user <user>', 'specify substrate blockhain user URI, default - "//Alice"', '//Alice')
  .argument('<string>', `takes JSON as string example: '${example}'`)
  .action(async (data: string, options: { dryRun: boolean, port: string, user: string, host: string }) => {
    log(`
      attempting to create a process...
      options: ${chalk.blueBright(JSON.stringify(options))}
      program: ${chalk.blueBright(data)}
    `)
    const { dryRun, ...rest } = options
    try {
      const res: Process.Response = await loadProcesses({ data, dryRun, options: {
          API_HOST: rest.host,
          API_PORT: parseInt(rest.port),
          USER_URI: rest.user,
        } 
      })
      log(`
        command ${chalk.bold('create')} executed successfully
        response: ${chalk.blueBright(JSON.stringify(res))}
      `);
      process.exit(1)
      
    } catch(err){
      console.log('Exception has been caught: ', err)
      program.help()
    }
  })

// TODO
program.command('disable')
  .description('A command for disabling an existing process flows. - NOT IMPLEMENTED')
  .action((data: string) => {
    console.log('not implemented', { data })
  })

program.parse()
if (!program.option) {
  program.help()
}

program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  process.exit(1);
})
