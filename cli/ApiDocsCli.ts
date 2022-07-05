import { ApiDocsOptions } from "../core/ApiDocsOptions";
import { DirectoryCrawler } from "../core/DirectoryCrawler";
import { FileScanner } from "../core/FileScanner";
import { JsonSchema } from "../core/JsonSchema";
import { lexer } from "../core/lexer/Lexer";
import { LexerTokens } from "../core/lexer/LexerTokens.type";

export class ApiDocsCli {
    constructor(private options: any) {

        this.apiOptions["dirToCrawl"] = this.options["dirToCrawl"] ? this.options["dirToCrawl"]:__dirname
        this.apiOptions["dirToIgnore"] = this.options["dirToIgnore"] ? this.options["dirToIgnore"]: ["node_modules", "*.git", ".git", ".git", ".gitignore"]
        this.apiOptions["OutputDir"] = this.options["OutputDir"]
     }

    private apiOptions: any= {}
    //private _lexer: LexerTokens;

    init(options: object = {}) {
        if (Array.from(Object.keys(options)).length == 0) {
            // AppTitle?: string | null | undefined,
            // Description?: string | null | undefined,
            // version?: string | null | undefined,
            // BaseUrl: string | null | undefined,
            // Headers?: object | null | undefined,
            // Host?: string | null | undefined,
            // BasePath?: string | null | undefined,
            // CollectionName?: string | null

            let _options: ApiDocsOptions = {
                AppTitle: __dirname + "_collection",
                BaseUrl: "http://localhost",
                version: "version1",
                CollectionName: __dirname + "collection"
            }

            this.apiOptions = {..._options}

        }
    }

    private LexerToken(): Array<LexerTokens> {

        let dirCrawler: DirectoryCrawler = new DirectoryCrawler({
            "directoryToRead": this.apiOptions["dirToCrawl"],
            path:this.apiOptions["dirToCrawl"],
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

    CreateCollection() {
        let tokens = this.LexerToken()
        let schema: JsonSchema = new JsonSchema(tokens, this.apiOptions)

       schema.CreateCollection()
    }
}