#!/usr/bin/env node --es-module-specifier-resolution=node

import chalk from 'chalk'
import figlet from 'figlet'
import clear from 'clear'
import { Command } from 'commander'
import * as api from './lib/api.js'

const program = new Command()

clear()
console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })))

async function getLastTokenId() {
  await api.default.isReady
  const lastTokenId = await api.default.query.simpleNftModule.lastToken()
  return console.log('Last Token ID:', lastTokenId.toJSON())
}

program.action(() => {
  getLastTokenId()
})

program.parse()
