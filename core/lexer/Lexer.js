"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexer = void 0;
const Enum_Helper_1 = require("../Helper/Enum.Helper");
const LexerTokenTypes_1 = require("./LexerTokenTypes");
const lexer = (inputs) => {
    const lines = [...inputs];
    //console.log("lines length " + lines.length)
    let counter = 0;
    let tokens = [];
    let identifiersList = (0, Enum_Helper_1.EnumToList)();
    let tokenTypeList = (0, Enum_Helper_1.EnumToList)();
    // console.log("tokenTypeList ", tokenTypeList)
    let ControllerPath = '';
    while (counter < lines.length) {
        let currentLine = lines[counter].trim();
        //const splitByQuote = currentLine.split('\'')
        //currentLine = currentLine[0] == '\'' 
        counter += 1;
        currentLine = currentLine.substring(4, currentLine.length).trim();
        //console.log("current line " + currentLine)
        // if (!startWithTripleSlash(currentLine))
        //     continue;
        if (currentLine == "\r\n")
            continue;
        const letCurrentLineSplit = currentLine.split(" ");
        //console.log("splitted line ", letCurrentLineSplit)
        letCurrentLineSplit.forEach((value) => {
            //console.log("current value ", value)
            // const identifierFound: boolean = identifiersList.filter(x => x.name == value).length > 0;
            //  if (identifierFound) {
            if (value.includes("MethodName") || value.includes("@Method")) {
                const splitCurrentValue = value.split("=");
                //console.log("splt" , splitCurrentValue)
                const putPostMethod = ["POST", "PUT"];
                // console.log("spr", splitCurrentValue)
                if (splitCurrentValue.length > 2)
                    throw new Error("method not properly formated");
                //                                0       1   2           3           4       5
                // format here is MethodName=(RequestName, GET,someValue, query=null, params, headers)
                if (splitCurrentValue.length == 2) {
                    // (GET, 'wallet/fund', {userid=2,location=en}, {})
                    const secondValue = splitCurrentValue[1].replace('(', '').replace(')', '');
                    const methodSpecificationSplitted = secondValue.split(";");
                    // console.log("spr", methodSpecificationSplitted)
                    const m = methodSpecificationSplitted;
                    const notFound = tokens.filter(x => x.RequestName == m[0]).length == 0;
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
                        TokenType: LexerTokenTypes_1.LexerTokenTypes.Method,
                        Headers: m[6]
                    });
                    // }
                    // }
                }
                if (splitCurrentValue.length == 1) {
                    // @Method(HTTPMETHOD, 'name/path', query, params)
                    //              0       1          2            3                   4   5
                    // @Method(RequestName, GET, 'wallet/fund', {userid=2,location=en}, {}, {})
                    const methodNameValue = splitCurrentValue[0].replace('@Method', '').replace('(', '').replace('(', '');
                    const methodSpecificationSplitted = methodNameValue.split(";");
                    const m = methodSpecificationSplitted;
                    const notFound = tokens.filter(x => x.RequestName == m[0]).length == 0;
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
                        TokenType: LexerTokenTypes_1.LexerTokenTypes.Method,
                        Headers: m[6],
                        ControllerPath
                    });
                    //  }
                    //  }
                }
            }
            if (value.includes("ControllerName") || value.includes('@Controller')) {
                const splitCurrentValue = value.split("=");
                // console.log("spr", splitCurrentValue)
                if (splitCurrentValue.length == 2) {
                    if (splitCurrentValue[1].startsWith("/") || splitCurrentValue.includes("/"))
                        throw new Error("the pattern ControllerName=value cannot start with or be in url path format, please use @Controller pattern instead");
                    ControllerPath = splitCurrentValue[1];
                    tokens.push({
                        KeyName: splitCurrentValue[0],
                        KeyDataType: 'string',
                        KeyValue: splitCurrentValue[1],
                        "TokenType": LexerTokenTypes_1.LexerTokenTypes.Controller,
                        ControllerPath,
                        Headers: null
                    });
                }
                if (splitCurrentValue.length == 1) {
                    const controllervalue = value.replace('@Controller(', '').replace('\'', '').replace(')', '');
                    tokens.push({
                        KeyName: splitCurrentValue[0],
                        KeyDataType: 'string',
                        KeyValue: controllervalue,
                        "TokenType": controllervalue.includes('/') || controllervalue.startsWith('/') ? LexerTokenTypes_1.LexerTokenTypes.Controller : LexerTokenTypes_1.LexerTokenTypes.ControllerPath,
                        ControllerPath,
                        Headers: null
                    });
                }
            }
            //  }
        });
    }
    return tokens;
};
exports.lexer = lexer;
const startWithTripleSlash = (text) => {
    return text.startsWith('///');
};
const splitLine = (text, matchAll = true) => {
    return text.split(/[\t\v\s]/);
};
const splitLineByEqual = (text) => {
    return text.split("=");
};
