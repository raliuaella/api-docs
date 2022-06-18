"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexer = void 0;
const Enum_Helper_1 = require("../Helper/Enum.Helper");
const String_Helper_1 = require("../Helper/String.Helper");
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
    let currentToken;
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
            console.log("current value ", value);
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
                    //const notFound: boolean = tokens.filter(x => x.RequestName == m[0]).length == 0
                    // (Name, POST, 'wallet/fund', {userid=2,location=en}, {}, {userId: 23}, {})
                    currentToken = {
                        _id: (0, String_Helper_1.generateTokenId)(),
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
                    };
                    tokens.push(currentToken);
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
                    // const notFound: boolean = tokens.filter(x => x.RequestName == m[0]).length == 0
                    //              0         1     2               3                   4   5
                    // @Method(RequestName, GET, 'wallet/fund', {userid=2,location=en}, {}, {})
                    currentToken = {
                        _id: (0, String_Helper_1.generateTokenId)(),
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
                    };
                    tokens.push(currentToken);
                }
            }
            if (value.toLowerCase().includes("Consume") || value.toLowerCase().includes("@Consumes")) {
                ///@Consumes=([application/json, application/xml])
                /// Produces=([application/json, text/csv])
                const splitCurrentValue = value.split("=");
                if (splitCurrentValue.length == 2) {
                    let consumeValue = splitCurrentValue[1].replace("(", "").replace("(", "").replace("[", "").replace("[", "");
                    console.log("consume value", consumeValue);
                    if (currentToken) {
                        currentToken.Consumes = [];
                        const splitConsumes = consumeValue.trim().split(",");
                        splitConsumes.forEach((v) => {
                            var _a;
                            (_a = currentToken.Consumes) === null || _a === void 0 ? void 0 : _a.push(v);
                        });
                    }
                }
                if (splitCurrentValue.length < 2) {
                    let consumeValue = splitCurrentValue[1].replace(/[(,),\',@,Consume,Consumes, @consume, @consumes, [,\]]+/ig, '');
                    if (currentToken) {
                        currentToken.Consumes = [];
                        const splitConsumes = consumeValue.trim().split(",");
                        splitConsumes.forEach((v) => {
                            var _a;
                            (_a = currentToken.Consumes) === null || _a === void 0 ? void 0 : _a.push(v);
                        });
                    }
                }
                const indexOfCurrentToken = tokens.findIndex(x => x._id == currentToken._id);
                tokens.splice(indexOfCurrentToken, 1, currentToken);
            }
            if (value.toLowerCase().includes("Produces") || value.toLowerCase().includes("@Produces")) {
                ///@Consumes=([application/json, application/xml])
                /// Produces=([application/json, text/csv])
                const splitCurrentValue = value.split("=");
                if (splitCurrentValue.length == 2) {
                    let consumeValue = splitCurrentValue[1].replace(/[(,), \],\[]+/ig, "").replace("(", "").replace("[", "").replace("[", "");
                    console.log("produce value", consumeValue);
                    if (currentToken) {
                        currentToken.Produces = [];
                        const splitConsumes = consumeValue.trim().split(",");
                        splitConsumes.forEach((v) => {
                            var _a;
                            (_a = currentToken.Consumes) === null || _a === void 0 ? void 0 : _a.push(v);
                        });
                    }
                }
                if (splitCurrentValue.length < 2) {
                    let consumeValue = splitCurrentValue[1].replace(/[(,),\',@,Product,Produces, @produce, @produces, [,\]]+/ig, '');
                    if (currentToken) {
                        currentToken.Produces = [];
                        const splitConsumes = consumeValue.trim().split(",");
                        splitConsumes.forEach((v) => {
                            var _a;
                            (_a = currentToken.Consumes) === null || _a === void 0 ? void 0 : _a.push(v);
                        });
                    }
                }
                const indexOfCurrentToken = tokens.findIndex(x => x._id == currentToken._id);
                tokens.splice(indexOfCurrentToken, 1, currentToken);
            }
            if (value.includes("ControllerName") || value.includes('@Controller')) {
                const splitCurrentValue = value.split("=");
                // console.log("spr", splitCurrentValue)
                if (splitCurrentValue.length == 2) {
                    if (splitCurrentValue[1].startsWith("/") || splitCurrentValue.includes("/"))
                        throw new Error("the pattern ControllerName=value cannot start with or be in url path format, please use @Controller pattern instead");
                    ControllerPath = splitCurrentValue[1];
                    currentToken = {
                        _id: (0, String_Helper_1.generateTokenId)(),
                        KeyName: splitCurrentValue[0],
                        KeyDataType: 'string',
                        KeyValue: splitCurrentValue[1].replace('(', '').replace(')', '').replace(/[\']=?/g, ''),
                        "TokenType": LexerTokenTypes_1.LexerTokenTypes.Controller,
                        ControllerPath,
                        Headers: null
                    };
                }
                tokens.push(currentToken);
                if (splitCurrentValue.length == 1) {
                    const controllervalue = value.replace(/[(,), 'controller', '@controller', \',\] \[ ]/ig, '').replace('@Controller(', '').replace('\'', '').replace(')', '');
                    currentToken = {
                        _id: (0, String_Helper_1.generateTokenId)(),
                        KeyName: splitCurrentValue[0],
                        KeyDataType: 'string',
                        KeyValue: controllervalue,
                        "TokenType": controllervalue.includes('/') || controllervalue.startsWith('/') ? LexerTokenTypes_1.LexerTokenTypes.Controller : LexerTokenTypes_1.LexerTokenTypes.ControllerPath,
                        ControllerPath,
                        Headers: null
                    };
                    tokens.push(currentToken);
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
