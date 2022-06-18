"use strict";
// import { ApiDocsOptions } from "./ApiDocsOptions";
// import { LexerTokens } from "./lexer/LexerTokens.type";
// import {Collection, Header, HeaderDefinition, Item} from 'postman-collection'
// import { JoinWith, parseParams, parseQuery, StringIsNullOrEmpty } from "./Helper/String.Helper";
// import { kill } from "process";
// export const Parser = (inputs: LexerTokens[], baseOptions: ApiDocsOptions): object => {
//     const collection = new Collection({
//         name: <string>baseOptions?.AppTitle,
//         info: {
//             version: <string>baseOptions?.version,
//             "name": <string>baseOptions?.AppTitle
//         }
//     })
//     inputs.forEach((value: LexerTokens)=>{
//         const currentControllers = inputs.filter(x=>x.ControllerPath.toLowerCase() == value.ControllerPath.toLowerCase());
//         currentControllers.forEach((v: LexerTokens)=>{
//             const methodNameUrl = typeof(v.KeyValue) == "object" ? v.KeyValue["path"]: v.KeyValue
//             // construct url (append controller path with method path)
//             // <string>baseOptions?.BaseUrl,
//             let fullUrl = JoinWith('/',  v.ControllerPath, methodNameUrl).replace(/\'\'+/g, '').replace(/[\']+/g, '').replace('(', '').replace(')', '')
//             const query = v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["query"]:null
//             const params = v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["params"]:null
//             const paramsIsNull: boolean = StringIsNullOrEmpty(params)
//             const queryIsNull: boolean  = StringIsNullOrEmpty(query)
//             if(!paramsIsNull && !queryIsNull)
//                 fullUrl += (parseParams(params)+parseQuery(query))
//             if(!paramsIsNull && queryIsNull)
//                 fullUrl += parseParams(params)
//             if(!queryIsNull && paramsIsNull)
//                 fullUrl += parseQuery(query);
//             console.log("full url ", fullUrl)
//             v.FullUrl = fullUrl
//            const header: string = (v.Headers ? 
//                             (v.Headers as string).replace('{','').replace('}', '').replace(/[\']+?/, ''): null) as string
//             console.log("headers ", header)
//         //     const headers: HeaderDefinition[] = Header.parse(header)
//         //     const method = v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["httpMethod"]:''
//         //     const rawBody = v.Headers ? 
//         //                         (v.Headers as string).replace(/[\']+?/, ''): {}
//         //    const request = {
//         //        header: headers,
//         //        url: fullUrl,
//         //        method,
//         //        body: {
//         //            mode: 'raw',
//         //            raw: JSON.stringify(rawBody)
//         //        },
//         //        query:{},
//         //    }
//         //    const item = new Item({
//         //       name: v.RequestName as string,
//         //       request,
//         //       "description": <string>v.RequestName
//         //    })
//         });
//     });
//     return {}
// }
