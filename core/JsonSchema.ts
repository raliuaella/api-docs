// import { ApiDocsOptions } from "./ApiDocsOptions";
// import { LexerTokens } from "./lexer/LexerTokens.type";
// import { Swagger } from "./swagger.type";

// export class JsonSchema {

//     constructor(private inputs: LexerTokens[], private options: ApiDocsOptions) {
       
//     }
//     private jsonObject: Swagger = {}
//     public toJSON(): string {
//         return JSON.parse(JSON.stringify(this.jsonObject))
//     }

//     private constructSwaggerObject() {

//         this.jsonObject["swagger"] = "2.0"
//         this.jsonObject["schemes"] = ["https","http"]
//         this.jsonObject["info"] = {
//             description: this.options.Description,
//             title: this.options.AppTitle,
//             version: this.options.version,
//             contact: {
//                 email: "apiteam@aellapp.com"
//             },
//             "license": {
//                 "name": "Apache 2.0",
//                 "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
//             },
//             host: this.options.Host,
//             basePath: this.options.BasePath,
//         }
//         const controllers: string[] = this.inputs.filter(x=>x.KeyName.toLowerCase().includes('controller'))
//                                                     .map((v: LexerTokens)=> {return v.KeyName})
//         controllers.forEach((v: string)=>{
//             this.jsonObject.tags?.push({
//                 name:v,
//                 description:v
//             })
//         })

//         let path = {}
//         let counter = 0;

//         const tokenCollections = this.inputs.filter(x=>x.KeyName.toLowerCase().includes('method'))
//         while(counter < tokenCollections.length) {
//             const currentToken = tokenCollections[counter]
//             counter += 1

//            // v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["query"]:null
//             const methodPath = currentToken.KeyValue
            
//         }

//     }
// }