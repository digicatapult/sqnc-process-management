#!/usr/bin/env node

//import  buildApi  from '@digicatapult/dscp-node';

import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import { Command } from 'commander';


const program = new Command();

clear();
console.log(
    chalk.red(
      figlet.textSync('Process CLI', { horizontalLayout: 'full' })
    ),
  );

program
  .name('Process Management')
  .description('CLI to to manag process flow')
  .version('0.0.1');

program.command('split')
  .description('Split a string into substrings and display as an array')
  .argument('<string>', 'string to split')
  .option('--first', 'display just the first substring')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();





//console.log(command);

// async function question(): Promise<any> {
//     chalk.red(
//         figlet.textSync('Process CLI', { horizontalLayout: 'full' })
//       );
    
  
//     command.option('-a, --anOption', 'Option 1').parse(process.argv);
//     const options = command.opts();
// }

//  question();