import { program } from 'commander';
import * as figlet from 'figlet';
import chalk from 'chalk'
import { CommandEnums } from './enums/commands.enum';
import { existsSync, readFileSync, statSync } from 'fs';
import { dirname, basename } from 'path'
import { ApiDocsCli } from './ApiDocsCli';
import * as yargs from 'yargs'

export class Program {
    constructor(input: string) {
        
        let args:string[] = []
       
         this.objectArgs = JSON.parse(input)
         console.log("input", this.objectArgs)
        args = this.objectArgs["_"]
       
        console.log("args ", args)
        this.commands = args
    }

    private objectArgs:any;
    private commands: string[] = [];
    private longVersionFormat: string = "version"
    private shortVersionFormat: string = "v"
    private currentCliVersion: string = "0.0.11-alpha"
    private apiDocsCli: ApiDocsCli = ApiDocsCli.getDefault;

    private ValidateCommand() {
        if (this.commands.length == 0)
            throw new Error("at least one command is required")
    }

    private TextFiglet() {
        console.log(chalk.green(
            figlet.textSync('Api-Docs-CLI', { horizontalLayout: "full" })
        ))
    }

    public CheckVersion() {
        this.ValidateCommand()
        const isShortVersionFormatDefined = this.commands.indexOf(this.shortVersionFormat)
        const isLongVersioNFormatDefined = this.commands.indexOf(this.longVersionFormat)

        if (isShortVersionFormatDefined > -1 && isShortVersionFormatDefined == 0) {
            this.TextFiglet()
            console.log(chalk.green(
                'Current Version is ' + this.currentCliVersion
            ))
        }

        if (isLongVersioNFormatDefined > -1 && isLongVersioNFormatDefined == 0) {
            this.TextFiglet()
            console.log(chalk.green(
                'Current Version is ' + this.currentCliVersion
            ))
        }

    }

    public process() {
        let args = this.commands
        let docs = args.indexOf(CommandEnums.DOCS)
        let init = args.indexOf(CommandEnums.INIT)
        //console.log("init", args)
       // let initCommand
        let shortVersion = args.indexOf(CommandEnums.ShortVersion)
        let longVersion = args.indexOf(CommandEnums.LongVersion)

        let generateCommand = args.indexOf(CommandEnums.GENERATE)

        if (docs > -1 || init > -1)
            this.init()

        if (shortVersion > -1 || longVersion > -1)
            this.CheckVersion()

        if (generateCommand > -1)
            this.Generate()

    }
    public init() {
        this.ValidateCommand()
        const isDocsCommandDefined = this.commands.indexOf(CommandEnums.DOCS)
        const isInitCommandDefined = this.commands.indexOf(CommandEnums.INIT)

        if (isInitCommandDefined > -1 && isInitCommandDefined == 0) {
            let initOtherArguments = this.commands.slice(isInitCommandDefined)
            console.log("otherArgument", initOtherArguments)
            let fullFileFormat = initOtherArguments.indexOf("from-file")
            //let shortFileFormat = initOtherArguments["f"]
            console.log(fullFileFormat)
            let filePath = ''
            if(fullFileFormat ) {
                let fullFileFormatSplit = initOtherArguments[fullFileFormat+1]
                console.log("full", fullFileFormatSplit)
                filePath = fullFileFormatSplit
                console.log("filePath", filePath)
                if(filePath == '' || filePath == null)
                    throw new Error("please specify valid file path")

                if(!(statSync(filePath).isFile()))
                    throw new Error("this is not a valid file")

            }
            let options = { ...JSON.parse(Buffer.from(readFileSync(filePath)).toString()) }
            console.log("opts", options)
            options.dirToIgnore = 
            this.apiDocsCli = options ? new ApiDocsCli(options): new ApiDocsCli()
        }
        //console.log("init", isDocsCommandDefined, this.commands)
        if (isDocsCommandDefined > -1 && isDocsCommandDefined == 0) {

            console.log(chalk.red(
                figlet.textSync('Api-Docs-CLI', { horizontalLayout: "full" })
            ))

            const help = `Api-Docs-CLI (version: ${this.currentCliVersion})
                        A simple cli to create postman collection and docs on the fly.
                        Example:
                            $ apidocs docs \t\t display information about the cli and available command`

            console.log(chalk.green(help))

            // program
            //     .name('Api-Docs-CLI')
            //     .description('CLI for automatic creation of postman collection and readthedocs')
            //     .version(this.currentCliVersion)
            //     .option('-v, --version', 'CLI for automatic creation of postman collection and readthedocs')
            //     .parse(process.argv)

        }
    }

    public Generate(format: string = "collection") {
        let isGenerateDefined = this.commands.indexOf(CommandEnums.GENERATE)
        console.log("generateIndex ", isGenerateDefined)

        if (isGenerateDefined == -1 || isGenerateDefined > 0)
            return;

        const otherArgument: string[] = this.commands.slice(isGenerateDefined)
        if (otherArgument.length == 0)
            return;
        let cli: ApiDocsCli = this.apiDocsCli
        if (cli)
            cli.CreateCollection()
        if (!cli.apiOptionsObject["isCliInitialized"])
            throw new Error("you need to run initialize command first")

        throw new Error("cli not initialized")

    }



}