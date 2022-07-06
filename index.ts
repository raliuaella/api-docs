#!/usr/bin/env node

import * as figlet from 'figlet';
//import { program } from 'commander';
import chalk from 'chalk'
import { resolve } from 'path';
import { existsSync, readFileSync, statSync } from 'fs';
import { ApiDocsCli } from './cli/ApiDocsCli';
import { Program } from './cli/program';
import { CommandEnums } from './cli/enums/commands.enum';

// console.clear()

// let sessinCli: ApiDocsCli = new ApiDocsCli({})
// //chalk.red("Hello")

// //let commando = new commander.Command()

// program.command('docs').description("print out information about api docs cli including help menu")






// program.command("init")
//   .description("initiatize settings needed to create a collection or api docs")
//   .argument('[file]', 'specify location of api-docs.json', 'api-docs.json')
//   .argument('[frompath]', 'specify location of api-docs.json')
//   .parse()

// program.command("generate")
//   .description("initiatize settings needed to create a collection or api docs")
//   .option('-o [outputdirectory]', 'specify location of api-docs.json', 'output.json')
//   .option('--output [outputdirectory]', 'specify location of api-docs.json')

// program.parse()

// let [init, generate, docs, ...others] = program.commands

// if (docs) {
//   console.log(
//     chalk.red(
//       figlet.textSync('Api-Docs CLI', { horizontalLayout: 'full' })
//     )

//   );

//   program.version('0.0.11')
//     .description('Api-Docs-CLI for automatic creation fo postman collection and readthedocs')
//     .option('-v', '--version', 'see the version of the CLI').parse()
// }

// if (init) {
//   const otherArgument: any = { ...others }
//   const { file } = otherArgument

//   if (file) {
//     let fileExist: boolean = existsSync(file)
//     if (!fileExist)
//       throw new Error("no such file")

//     let isFile: boolean = statSync(file).isFile()

//     if (!isFile)
//       throw new Error("not a valid file format")
//   }

//   let fileToJson = !file ? JSON.stringify((Buffer.from(readFileSync('api-docs.json'))).toString()) : JSON.stringify((Buffer.from(readFileSync(file)).toString()))

//   //console.log("defaultFile", fileToJson)
//   let cli: ApiDocsCli = new ApiDocsCli(JSON.parse(fileToJson))
//   sessinCli = cli;
// }

// if (generate) {
//   const otherArgument: any = program.opts()
//   console.log(otherArgument)

//   if (sessinCli)
//     sessinCli.CreateCollection()
// }

//console.log(process.argv)

let args = Array.from(process.argv)

let program: Program = new Program(args)

// init
let docs = args.indexOf(CommandEnums.DOCS)
let shortVersion = args.indexOf(CommandEnums.ShortVersion)
let longVersion = args.indexOf(CommandEnums.LongVersion)

if(docs)
  program.init()

if(shortVersion || longVersion)
  program.CheckVersion()