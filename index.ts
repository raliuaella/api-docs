#!/usr/bin/env node

import * as chalk from 'chalk'
//import * as clear  from 'clear'
import * as figlet from 'figlet';
import * as path  from 'path';
import * as commander from 'commander';




console.clear()
console.log(
  chalk.red(
    figlet.textSync('Api-Docs Generator', { horizontalLayout: 'full' })
  )
);

commander.program
        .version('0.0.11')
        .description('Api-Docs-CLI for automatic creation fo postman collection and readthedocs')
        .option('-V', '--Version', 'see the version of the CLI')
        .option('init', 'initialize api docs')
        .parse(process.argv)