import { Console } from "console";
import { EnumToList } from "../Helper/Enum.Helper";
import { unique } from "../Helper/String.Helper";
import { Keywords } from "./identifier.enum";
import { LexerTokens } from "./LexerTokens.type";
import { LexerTokenTypes } from "./LexerTokenTypes";

export const lexer = (inputs: string[]) => {
    const lines = [...inputs]
    //console.log("lines length " + lines.length)
    let counter: number = 0;
    let tokens: LexerTokens[] = [];
    let identifiersList = EnumToList<Keywords>()
    let tokenTypeList = EnumToList<LexerTokenTypes>()
    // console.log("tokenTypeList ", tokenTypeList)
    let ControllerPath: string = ''

    while (counter < lines.length) {
        let currentLine: string = lines[counter].trim();
        //const splitByQuote = currentLine.split('\'')
        //currentLine = currentLine[0] == '\'' 
        counter += 1

        currentLine = currentLine.substring(4, currentLine.length).trim()
        //console.log("current line " + currentLine)
        // if (!startWithTripleSlash(currentLine))
        //     continue;
        if (currentLine == "\r\n")
            continue;

        const letCurrentLineSplit: string[] = currentLine.split(" ")
        //console.log("splitted line ", letCurrentLineSplit)
        letCurrentLineSplit.forEach((value: string) => {
            //console.log("current value ", value)
            // const identifierFound: boolean = identifiersList.filter(x => x.name == value).length > 0;
            //  if (identifierFound) {
            if (value.includes("MethodName") || value.includes("@Method")) {
                const splitCurrentValue: string[] = value.split("=")
                //console.log("splt" , splitCurrentValue)
                const putPostMethod: string[] = ["POST", "PUT"]
                // console.log("spr", splitCurrentValue)
                if (splitCurrentValue.length > 2)
                    throw new Error("method not properly formated")
                //                                0       1   2           3           4       5
                // format here is MethodName=(RequestName, GET,someValue, query=null, params, headers)
                if (splitCurrentValue.length == 2) {
                    // (GET, 'wallet/fund', {userid=2,location=en}, {})
                    const secondValue = splitCurrentValue[1].replace('(', '').replace(')', '');
                    const methodSpecificationSplitted = secondValue.split(";")

                    // console.log("spr", methodSpecificationSplitted)

                    const m = methodSpecificationSplitted
                    const notFound: boolean = tokens.filter(x => x.RequestName == m[0]).length == 0

                  //  if (notFound) {
                        // if (!(putPostMethod.includes(m[1].toUpperCase()))) {
                        //     // if (methodSpecificationSplitted.length != 6)
                        //     //     throw new Error("invalid method specification")

                        //     tokens.push({
                        //         KeyName: splitCurrentValue[0],
                        //         KeyDataType: 'object',
                        //         KeyValue: {
                        //             httpMethod: m[1],
                        //             path: m[2],
                        //             query: m[3],
                        //             params: m[4]
                        //         },
                        //         RequestName: m[0],
                        //         ControllerPath,
                        //         TokenType: LexerTokenTypes.Method,
                        //         Headers: m[5]
                        //     })

                        // }

                       // if (putPostMethod.includes(m[1])) {
                            // (Name, POST, 'wallet/fund', {userid=2,location=en}, {}, {userId: 23}, {})
                            tokens.push({
                                KeyName: splitCurrentValue[0],
                                KeyDataType: 'object',
                                KeyValue: {
                                    httpMethod: m[1],
                                    path: m[2],
                                    query: m[3],
                                    params: m[4],
                                    body: m[5]
                                },
                                RequestName: m[0],
                                ControllerPath,
                                TokenType: LexerTokenTypes.Method,
                                Headers: m[6]
                            })
                       // }
                    // }

                }

                if (splitCurrentValue.length == 1) {
                    // @Method(HTTPMETHOD, 'name/path', query, params)
                    //              0       1          2            3                   4   5
                    // @Method(RequestName, GET, 'wallet/fund', {userid=2,location=en}, {}, {})
                    const methodNameValue = splitCurrentValue[0].replace('@Method', '').replace('(', '').replace('(', '')
                    const methodSpecificationSplitted = methodNameValue.split(";")

                    const m = methodSpecificationSplitted

                    const notFound: boolean = tokens.filter(x => x.RequestName == m[0]).length == 0

                //   //  if (notFound) {



                //         if (!putPostMethod.includes(m[1])) {
                //             // if (methodSpecificationSplitted.length != 6)
                //             // throw new Error("invalid method specification")

                //             tokens.push({
                //                 KeyName: splitCurrentValue[0],
                //                 KeyDataType: 'object',
                //                 KeyValue: {
                //                     httpMethod: m[1],
                //                     path: m[2],
                //                     query: m[3],
                //                     params: m[4]
                //                 },
                //                 RequestName: m[0],
                //                 TokenType: LexerTokenTypes.Method,
                //                 Headers: m[5],
                //                 ControllerPath

                //             })

                //         }

                       // if (putPostMethod.includes(m[1])) {
                            //              0         1     2               3                   4   5
                            // @Method(RequestName, GET, 'wallet/fund', {userid=2,location=en}, {}, {})
                            tokens.push({
                                KeyName: splitCurrentValue[0],
                                KeyDataType: 'object',
                                KeyValue: {
                                    httpMethod: m[1],
                                    path: m[2],
                                    query: m[3],
                                    params: m[4],
                                    body: m[5]
                                },
                                RequestName: m[0],
                                TokenType: LexerTokenTypes.Method,
                                Headers: m[6],
                                ControllerPath

                            })

                      //  }

                  //  }

                }

            }

            if (value.includes("ControllerName") || value.includes('@Controller')) {
                const splitCurrentValue = value.split("=")
                // console.log("spr", splitCurrentValue)
                if (splitCurrentValue.length == 2) {
                    if (splitCurrentValue[1].startsWith("/") || splitCurrentValue.includes("/"))
                        throw new Error("the pattern ControllerName=value cannot start with or be in url path format, please use @Controller pattern instead")

                    ControllerPath = splitCurrentValue[1]
                    tokens.push({
                        KeyName: splitCurrentValue[0],
                        KeyDataType: 'string',
                        KeyValue: splitCurrentValue[1].replace('(', '').replace(')', '').replace(/[\']=?/, ''),
                        "TokenType": LexerTokenTypes.Controller,
                        ControllerPath,
                        Headers: null
                    })
                }

                if (splitCurrentValue.length == 1) {
                    const controllervalue = value.replace('@Controller(', '').replace('\'', '').replace(')', '')
                    tokens.push({
                        KeyName: splitCurrentValue[0],
                        KeyDataType: 'string',
                        KeyValue: controllervalue,
                        "TokenType": controllervalue.includes('/') || controllervalue.startsWith('/') ? LexerTokenTypes.Controller : LexerTokenTypes.ControllerPath,
                        ControllerPath,
                        Headers: null
                    })
                }
            }

            //  }


        });


    }

    return tokens;
}


const startWithTripleSlash = (text: string): boolean => {
    return text.startsWith('///')
}

const splitLine = (text: string, matchAll: boolean = true): string[] => {
    return text.split(/[\t\v\s]/)
}

const splitLineByEqual = (text: string): string[] => {
    return text.split("=")
}


