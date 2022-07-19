import { execFileSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { ApiDocsOptions } from "../core/ApiDocsOptions";
import { DirectoryCrawler } from "../core/DirectoryCrawler";
import { FileScanner } from "../core/FileScanner";
import { JsonSchema } from "../core/JsonSchema";
import { lexer } from "../core/lexer/Lexer";
import { LexerTokens } from "../core/lexer/LexerTokens.type";

export class ApiDocsCli {
    constructor(private options?:object) {

       

       if(this.options)
        {

            this.apiOptions = {...this.options, ...this.apiOptions}
        }
    }

    private apiOptions: any = { isCliInitialized: false }
    //private _lexer: LexerTokens;

    init(jsonFile?:string) {
        //console.log("initializing....", jsonFile)
        this.apiOptions["isCliInitialized"] = true
        if(!jsonFile) {
            let apiDoscJsonFile = join(__dirname, "../../", "api-docs.json")
            if (existsSync(apiDoscJsonFile)) {
                this.apiOptions = { ...JSON.parse(Buffer.from(readFileSync(apiDoscJsonFile)).toString()) }
                //console.log("apioptions ", this.apiOptions)
            }
            else {
                throw new Error("configuration file not specified")
            }
            
        }
        else {
            const apiDoscJsonFile = join(jsonFile as string)
            if(existsSync(apiDoscJsonFile)) {
                this.apiOptions = { ...JSON.parse(Buffer.from(readFileSync(apiDoscJsonFile)).toString()) }
               // console.log("apioptions ", this.apiOptions)
                
            }

            return this.apiOptions
           // console.log("apioptions ", this.apiOptions)
            
        }
    }

    private LexerToken(): Array<LexerTokens> {
        let dirCrawler: DirectoryCrawler = new DirectoryCrawler({
            "directoryToRead": this.apiOptions["dirToCrawl"],
            path: this.apiOptions["dirToCrawl"],
            "ignore": this.apiOptions["dirToIgnore"]
        })
        let files: Array<string> = dirCrawler.walk()
        let lexers = []
        for (let file of files) {
            const fsScanner = new FileScanner(file, { isRelative: false })
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

    set apiOptionsObject(value) {
        this.apiOptions = value
    }

    CreateCollection(docsOptions?:object) {
        let tokens = this.LexerToken()
       // console.log("tokens", tokens)
        let schema: JsonSchema = new JsonSchema(tokens, docsOptions ? docsOptions: this.apiOptions)

        schema.CreateCollection()
    }

    
}