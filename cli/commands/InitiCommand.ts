import { readFileSync } from "fs"
import { ApiDocsCli } from "../ApiDocsCli"
import { BaseCommand } from "./BaseCommand"



export class InitCommand extends BaseCommand {

    constructor() {
        super(
            "init",
            "initialize new settings",
            [],
            [
                ["-f", "--file <string>", "The path or filename of the settings file in case you dont want to use apidocs.json or it is saved in diff dir"],
            ]
        )
    }

    action(options:any):void {
       if(options.file) {
            let cli: ApiDocsCli = new ApiDocsCli(options.file)
            cli.init()
            this.result = cli
            this.cli = cli
       }
    }
}