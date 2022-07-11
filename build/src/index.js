#!/usr/bin/env node --es-module-specifier-resolution=node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import chalk from 'chalk';
import figlet from 'figlet';
import clear from 'clear';
import { Command } from 'commander';
import * as api from './lib/api.js';
const program = new Command();
clear();
console.log(chalk.red(figlet.textSync('Process CLI', { horizontalLayout: 'full' })));
function getLastTokenId() {
    return __awaiter(this, void 0, void 0, function* () {
        yield api.default.isReady;
        const lastTokenId = yield api.default.query.simpleNftModule.lastToken();
        return console.log('Last Token ID:', lastTokenId.toJSON());
    });
}
program.action(() => {
    getLastTokenId();
});
program.parse();
