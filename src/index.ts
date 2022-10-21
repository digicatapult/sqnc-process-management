#!/usr/bin/env node --es-module-specifier-resolution=node
import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'
import { Command } from 'commander'
import { createProcess, loadProcesses } from './lib/process/index.js'

const program = new Command()

program
  .name('process management')
  .description('a command line interface for managing chain processes')
  .version('0.1.0')


// TODO 
program.command('create')
  .description('A command for persisting process flows onto the chain')
  .argument('<process | process[]>', 'process/es to be created expected in JSON format', '{}')
  .option('-f, --file <json>', 'takes JSON file as an argument', undefined)
  .action(async (data: any, opt: any) => {
    console.log({ data, opt })
    if (opt.f) {
      await loadProcesses(opt.file)
      console.log('opt.f is defined')
    }

    await createProcess('name', 1, data)
  })

// TODO 
program.command('disable')
  .action((str: any, opt: any) => {
    console.log('', { str, opt })
  })

clear()
console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })))

program.parse()
