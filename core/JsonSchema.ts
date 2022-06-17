import { ApiDocsOptions } from "./ApiDocsOptions";
import { LexerTokens } from "./lexer/LexerTokens.type";
import { Swagger } from "./swagger.type";

export class JsonSchema {

    constructor(private inputs: LexerTokens[], private options: ApiDocsOptions) {
        this.jsonObject["swagger"] = "2.0"
        this.jsonObject["schemes"] = ["https","http"]
        this.jsonObject["info"] = {
            description: options.Description,
            title: options.AppTitle,
            version: options.version,
            contact: {
                email: "apiteam@aellapp.com"
            },
            "license": {
                "name": "Apache 2.0",
                "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            host: options.Host,
            basePath: options.BasePath,
        }
        const controllers: string[] = this.inputs.filter(x=>x.KeyName.toLowerCase().includes('controller'))
                                                    .map((v: LexerTokens)=> {return v.KeyName})
        controllers.forEach((v: string)=>{
            this.jsonObject.tags.push({
                name:v,
                description:v
            })
        })
    }
    private jsonObject: Swagger = {}
    public toJSON(): string {
        return JSON.parse(JSON.stringify(this.jsonObject))
    }
}