import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { ApiDocsOptions } from "../core/ApiDocsOptions";
import { DirectoryCrawler } from "../core/DirectoryCrawler";
import { FileScanner } from "../core/FileScanner";
import { JsonSchema } from "../core/JsonSchema";
import { lexer } from "../core/lexer/Lexer";
import { LexerTokens } from "../core/lexer/LexerTokens.type";

export class ApiDocsCli {
    constructor(private jsonFile?:string) {

        // this.apiOptions["dirToCrawl"] = this.options ? this.options["dirToCrawl"] : null
        // this.apiOptions["dirToIgnore"] = this.options ? this.options["dirToIgnore"] : null
        // this.apiOptions["OutputDir"] = this.options ? this.options["OutputDir"] : null

        this.init()
    }

    private apiOptions: any = { isCliInitialized: false }
    //private _lexer: LexerTokens;

    init() {
        this.apiOptions["isCliInitialized"] = true
        if(!this.jsonFile) {
            let apiDoscJsonFile = join(__dirname, "../../", "api-docs.json")
            if (existsSync(apiDoscJsonFile)) {
                this.apiOptions = { ...JSON.parse(Buffer.from(readFileSync(apiDoscJsonFile)).toString()) }
            }
            else {
                apiDoscJsonFile = join(this.jsonFile as string)
                this.apiOptions = { ...JSON.parse(Buffer.from(readFileSync(apiDoscJsonFile)).toString()) }
            }
        }
        // if (Array.from(Object.keys(this.apiOptions)).length == 0 || Array.from(Object.keys(this.apiOptions)).length == 1) {
        //     let apiDoscJsonFile = join(__dirname, "../../", "api-docs.json")
        //     if (existsSync(apiDoscJsonFile)) {
        //         this.apiOptions = { ...JSON.parse(Buffer.from(readFileSync(apiDoscJsonFile)).toString()) }
        //     }
        //     else {
        //         this.apiOptions = { ...this.options }
        //     }
        // }
    }

    private LexerToken(): Array<LexerTokens> {

        console.log("options ", this.apiOptions)

        let dirCrawler: DirectoryCrawler = new DirectoryCrawler({
            "directoryToRead": this.apiOptions["dirToCrawl"],
            path: this.apiOptions["dirToCrawl"],
            "ignore": this.apiOptions["dirToIgnore"]
        })
        let files: Array<string> = dirCrawler.walk()
        let lexers = []
        for (let file of files) {
            const fsScanner = new FileScanner(file, { isRelative: false })

            //console.log(fsScanner.ReadAllLines())
            const _lexer = lexer(fsScanner.ReadAllLines())
            lexers.push(..._lexer)
        }
        return lexers
    }

    public static get getDefault() {
        return new ApiDocsCli();
    }

    get apiOptionsObject() {
        return this.apiOptions
    }

    CreateCollection() {
        let tokens = this.LexerToken()
        console.log("tokens", tokens)
        let schema: JsonSchema = new JsonSchema(tokens, this.apiOptions)

        schema.CreateCollection()
    }
}