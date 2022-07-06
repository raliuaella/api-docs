import { program } from 'commander';
import * as figlet from 'figlet';
import chalk from 'chalk'
import { CommandEnums } from './enums/commands.enum';

export class Program {
    constructor(args: string[]) {
        if (args && args.length == 2)
            throw new Error("expect at least one argument")

        //this.command = new commander.Command()
        this.commands = Array.from(args).slice(2)
        //console.log("commands ", this.commands)
    }


    private commands: string[] = [];
    private longVersionFormat: string = "version"
    private shortVersionFormat: string = "v"
    private currentCliVersion: string = "0.0.11-alpha"

    private ValidateCommand() {
        if (this.commands.length == 0)
            throw new Error("at least one command is required")
    }

    private TextFiglet() {
        console.log(chalk.red(
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
            console.log(chalk.red(
                'Current Version is ' + this.currentCliVersion
            ))
        }

    }

    public init() {
        this.ValidateCommand()
        const isDocsCommandDefined = this.commands.indexOf(CommandEnums.DOCS)
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



}