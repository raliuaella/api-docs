import { readFileSync } from "fs"
import { ApiDocsCli } from "../ApiDocsCli"
import BaseCommand from "./BaseCommand"



export default class InitCommand extends BaseCommand {

    constructor(cli?: ApiDocsCli) {
        super(
            "init",
            "initialize new settings",
            [],
            [
                ["-f", "--file <string>", "The path or filename of the settings file in case you dont want to use apidocs.json or it is saved in diff dir"],
            ]
        )
    }

    static get instance() {
        return new InitCommand()
    }

    action(options: any): object {
        let apidDocsCli = new ApiDocsCli()
        let returnValue = apidDocsCli.init(options.file)
       // console.log("returnValue ", returnValue)
        apidDocsCli.CreateCollection(returnValue)
        apidDocsCli.apiOptionsObject = returnValue

        return this.cli.apiOptionsObject

    }
}