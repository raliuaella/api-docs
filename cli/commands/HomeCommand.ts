import chalk from "chalk"
import figlet from "figlet"
import { readFileSync } from "fs"
import { ApiDocsCli } from "../ApiDocsCli"
import BaseCommand from "./BaseCommand"



export default class HomeCommand extends BaseCommand {

    constructor(cli?:ApiDocsCli) {
        super(
            "docs",
            "display available command",
            [],
            []
        )
    }

    action():void {
        
        console.log(chalk.green(
            figlet.textSync('Api-Docs-CLI', { horizontalLayout: "full" })
        ))
        console.log(chalk.green(
            'Current Version is ' + "0.0.11"
        ))
    }
}