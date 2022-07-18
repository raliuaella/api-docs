#!/usr/bin/env node

import * as figlet from 'figlet';
//import { program } from 'commander';
import chalk from 'chalk'
import { join, resolve } from 'path';
import { existsSync, readdirSync, readFileSync, statSync } from 'fs';
import { ApiDocsCli } from './cli/ApiDocsCli';
import { Program } from './cli/program';
import { CommandEnums } from './cli/enums/commands.enum';
import * as yargs from 'yargs'
import { Command, Option } from 'commander';

const program = new Command()

let commands:any[] = []

let commandDir = join(__dirname, 'cli', 'commands')

readdirSync(commandDir)
.filter(file=>file.match(/[a-zA-Z]+Command.ts/))
.map(file=>{
    let _file = require(join(__dirname, 'cli','commands', file))
    commands.push(new _file())
})


commands.forEach( c => {
    //get the definition of our command
    const commandDef = c.definition()

    //we then use it to build the command we're going to be executing later.
    const subCommand = program
     .command(commandDef.command)
     .description(commandDef.help)
    
    commandDef.arguments.forEach((arg:any[]) => {
        subCommand.argument(arg[0], arg[1])
    })

    commandDef.options.forEach((o:any[]) => {
       subCommand.option([o[0], o[1]].join(","),o[2], o[3] ) 
    })
    subCommand
     .action(function() {
        c.action.apply(c, arguments)
        console.log(c.getResult())
     })
    
})

//parse the input and decide which command we're trying to execute.
program.parse()