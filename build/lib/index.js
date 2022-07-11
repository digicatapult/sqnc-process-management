#!/usr/bin/env node
//import { buildApi }  from '@digicatapult/dscp-node';
import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'
import { Command } from 'commander'
const program = new Command()
clear()
console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })))
program.name('process').description('CLI to to manage process flow').version('0.0.1')
program
  .command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined
    console.log(str.split(options.separator, limit))
  })
program
  .command('join')
  .description('Join the command-arguments into a single string')
  .argument('<strings...>', 'one or more strings')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((strings, options) => {
    console.log(strings.join(options.separator))
  })
program.parse()
