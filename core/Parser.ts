import { ApiDocsOptions } from "./ApiDocsOptions";
import { LexerTokens } from "./lexer/LexerTokens.type";
import {Collection, Item} from 'postman-collection'
import { JoinWith } from "./Helper/String.Helper";

export const Parser = (inputs: LexerTokens[], baseOptions: ApiDocsOptions): object => {

    const collection = new Collection({
        name: <string>baseOptions?.AppTitle,
        info: {
            version: <string>baseOptions?.version,
            "name": <string>baseOptions?.AppTitle
        }
    })

    inputs.forEach((value: LexerTokens)=>{
        const currentControllers = inputs.filter(x=>x.ControllerPath.toLowerCase() == value.ControllerPath.toLowerCase());
        currentControllers.forEach((v: LexerTokens)=>{
            const methodNameUrl = typeof(v.KeyValue) == "object" ? v.KeyValue["path"]: v.KeyValue
            const fullUrl = JoinWith('/', <string>baseOptions?.BaseUrl, v.ControllerPath, methodNameUrl).replace(/[\']+/, '').replace(/[\']+/, '')

           console.log("full url ", v)
           const request = new Item({
              // name
           })
        });
       
    });

    return {}
}