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
import InitCommand from './cli/commands/InitiCommand';
import HomeCommand from './cli/commands/HomeCommand';
import GenerateCommand from './cli/commands/GenerateCommand';
import { command } from 'yargs';
import { CliState } from './cli/state';

const program = new Command()

let apidDocsCli: ApiDocsCli = new ApiDocsCli()

let commands: any[] = [{ name: "init", command: new InitCommand(apidDocsCli) }, { name: "docs", command: new HomeCommand(apidDocsCli) }, { name: "generate", command: new GenerateCommand(apidDocsCli) }]
let subCommands: any[] = []
let cliInitResult: any = null;

commands.forEach(c => {
    //get the definition of our command
    // console.log(c)
    const { name, command } = c
    const commandDef = command.definition()

    //we then use it to build the command we're going to be executing later.
    const subCommand = program
        .command(commandDef.command)
        .description(commandDef.help)

    commandDef.arguments.forEach((arg: any[]) => {
        subCommand.argument(arg[0], arg[1])
    })

    commandDef.options.forEach((o: any[]) => {
        subCommand.option([o[0], o[1]].join(","), o[2], o[3])
    })

    subCommands.push({
        command: subCommand,
        commandHandler: command,
        arguments: subCommand.args,
        options: subCommand.opts(),
        name
    })

})

//parse the input and decide which command we're trying to execute.
//console.log(subCommands)

program.parse()

let args = program.args
let firstCommand = args[0]

//console.log("args ", args)
let cli: ApiDocsCli = ApiDocsCli.getDefault

if (firstCommand == CommandEnums.INIT) {
    let initCommand = subCommands.filter(x => x["name"] == CommandEnums.INIT)

    if (initCommand && initCommand.length == 1) {

        let commandToExecute = initCommand[0]
        commandToExecute.commandHandler.action(commandToExecute.options)
    }
}

if (firstCommand == CommandEnums.GENERATE) {
    let initCommand = subCommands.filter(x => x["name"] == CommandEnums.GENERATE)
    console.log("generate cliInitResult", CliState.clioptions)
    if (initCommand && initCommand.length == 1) {
        apidDocsCli.CreateCollection(apidDocsCli.apiOptionsObject)
        let commandToExecute = initCommand[0]
        commandToExecute.commandHandler.action(cli.apiOptionsObject, commandToExecute.options)
    }
}