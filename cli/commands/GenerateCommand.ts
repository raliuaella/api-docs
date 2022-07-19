import { readFileSync } from "fs"
import { ApiDocsCli } from "../ApiDocsCli"
import BaseCommand  from "./BaseCommand"



export default class GenerateCommand extends BaseCommand {

    constructor(cli?:ApiDocsCli) {
        super(
            "generate",
            "generate collections, or gitbook or postman documentation or confluence or readme file",
            [],
            [
                ["-t", "--type <string>", "specify the type of action to generate, collections, gitbook, readme or confluence documentation"],
                ["-f", "--file [string]", "this can be used to override the file provided when init command was authored"]
            ]
        )
    }

    static get instance(){
        return new GenerateCommand()
    }

    action(cliOptions?:any, options?:any):ApiDocsCli {
        console.log("apiOptions", cliOptions)
       if(cliOptions) {
            let cli: ApiDocsCli = new ApiDocsCli(cliOptions)
            cli.CreateCollection()
       }else {
           throw new Error("please specify configuration set")
       }
       return ApiDocsCli.getDefault
    }
}