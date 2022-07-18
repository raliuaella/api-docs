import { ApiDocsCli } from "../ApiDocsCli"

export class BaseCommand {
    constructor(name:string, descr:string, args = [], options:any[] = []) {
        this.command = name
        this.help = descr
        this.arguments = args 
        this.options = options
        this.result = null
        this.cli = ApiDocsCli.getDefault
    }

    command:string;
    help:string;
    arguments:unknown[];
    options:unknown[];
    result:any
    cli: ApiDocsCli;

    getResult() {
        return this.result
    }

    definition() {
        return {
            command: this.command,
            help: this.help,
            arguments: this.arguments,
            options: this.options
        }
   }

    // action() {
    //     throw Error("This method needs to be implemented by each specific command")
    // }
}