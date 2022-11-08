#!/usr/bin/env node --es-module-specifier-resolution=node

import chalk from 'chalk'
import figlet from 'figlet'
import { Command } from 'commander'

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
  .option('-d, --dryRun <bool>', 'performs a dry run', false)
  .option('-h, --host <string>', 'substrate blockchain host address or FQDM, default - "localhost"', 'localhost')
  .option('-p, --port <number>', 'specify host port number if it is not a default, default - 9944', '9944')
  .option('-u, --user <string>', 'specify substrate blockhain user URI, default - "//Alice"', '//Alice')
  .argument('<string>', `takes JSON as string example: '${example}'`)
  .action(async (data: string, options: { dryRun: boolean, port: number, user: string, host: string }) => {
    console.log('parsed options: ', options)
    const { dryRun, ...rest } = options
    try {
      const res = await loadProcesses({ data, dryRun, options: {
        API_HOST: rest.host,
        API_PORT: rest.port,
        USER_URI: rest.user,
      } })

      console.log({ res })
      
    } catch(err) {
      console.log({ err })
    }
  })

// TODO
program.command('disable')
  .description('A command for disabling an existing process flows. - NOT IMPLEMENTED')
  .action((data: string) => {
    console.log('not implemented', { data })
  })

console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })))

program.parse()

