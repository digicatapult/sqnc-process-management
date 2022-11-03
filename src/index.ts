#!/usr/bin/env node --es-module-specifier-resolution=node
import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'
import { Command } from 'commander'

import { version } from '../package.json' 
import { loadProcesses } from './lib/process/index.js'

const program = new Command()
const example: string = JSON.stringify([{
  name: 'A test',
  version: 1,
  program: [  
    { SenderOwnsAllInputs: {} },
    { SenderHasInputRole: 
      {
        index: 0,
        roleKey: 'Supplier',
      },
    },
    { op: 'and'},
    { FixedOutputMetadataValueType: {
        index: 0,
        metadataKey: 'SomeMetadataKey',
        metadataValueType: 'Literal',
      }
    },
    { FixedOutputMedataValueType:
      {
        index: 0,
        metadataKey: 'SomeOtherMetadataKey',
        metadataValueType: 'File',
      },
    },
    { op: 'and'},
    { op: 'and'},
  ],
}])
 
program
  .name('process management')
  .description('a command line interface for managing chain processes')
  .version(version)


program.command('create')
  .description('A command for persisting process flows onto the chain')
  .argument('<string>', `takes JSON as string example: '${example}'`)
  .action(async (data: string) => {
    await loadProcesses(data)
  })

// TODO
program.command('disable')
  .action((data: string) => {
    console.log('not implemented', { data })
  })

clear()
console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })))

program.parse()
