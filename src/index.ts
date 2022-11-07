#!/usr/bin/env node

import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'
import { Command, Option } from 'commander'

import { loadProcesses } from './lib/process/index.js'

const program = new Command()
const example: string = JSON.stringify([{
  name: 'A test',
  version: 1,
  program: [  
    { restriction: { SenderOwnsAllInputs: {} }} ,
    { restriction: { SenderHasInputRole: 
      {
        index: 0,
        roleKey: 'Supplier',
      },
    }},
    { op: 'and'},
    { restriction: { FixedOutputMetadataValueType: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValueType: 'Literal',
      }
    }},
    { restriction:{ FixedOutputMedataValueType:
      {
        index: 0,
        metadataKey: 'SomeOtherMetadataKey',
        metadataValueType: 'File',
      },
    }},
    { op: 'and'},
    { op: 'and'},
  ],
}])
 
program
  .name('process management')
  .description('a command line interface for managing chain processes')
  .version('1.4.0')


program.command('create')
  .description('A command for persisting process flows onto the chain')
  .addOption(new Option('-d, --dryRun <bool>', 'performs a dry run')
    .choices([ 'true', 'false' ])
    .default(false))
  .option('-h, --host <string>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .addOption(new Option('-p, --port <number>', 'spefify substrate blockchain port number, default - 9944')
    .default(9944))
  .addOption(new Option('-u, --user <string>', 'spefify substrate blockhain user URI, default - "//Alice"')
    .default('//Alice'))
  .parse(process.argv)
  .argument('<string>', `takes JSON as string example: '${example}'`)
  .action(async (data: string, options: { dryRun: boolean, port: number, user: string, host: string }) => {
    // README it looks like it goes with thedefault values, not sure comming and leaving a comment
    // TODO figure out why it's not parsing options
    const { dryRun, ...rest } = options
    await loadProcesses({ data, dryRun, options: {
      API_HOST: rest.host,
      API_PORT: rest.port,
      USER_URI: rest.user,
    } })
  })

// TODO
program.command('disable')
  .action((data: string) => {
    console.log('not implemented', { data })
  })

clear()
console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })))

program.parse()
