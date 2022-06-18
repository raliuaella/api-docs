"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexer = void 0;
const String_Helper_1 = require("../Helper/String.Helper");
const lexer = (inputs) => {
    let lines = [...inputs];
    //console.log("lines length " + lines.length)
    const newLines = [...(0, String_Helper_1.alllinesThatBeginWith)(/^\/\/\//ig, lines)];
    //console.log(newLines)
    lines = [...newLines];
    let allTokenValues = (0, String_Helper_1.getAllTokenValues)(lines);
    console.log(allTokenValues);
    //newLinesRegex.test()
    let counter = 0;
    let tokens = [];
    // let identifiersList = EnumToList<Keywords>()
    // let tokenTypeList = EnumToList<LexerTokenTypes>()
    // // console.log("tokenTypeList ", tokenTypeList)
    // let ControllerPath: string = ''
    // let currentToken: LexerTokens;
    /*
        [
            { type: 'ControllerName', value: "'api/WalletController'" },
            {
              type: 'MethodName',
              value: "BankLisiting;GET;'v2/bank-listing';{pageIndex:1pageSize:10};null;null;null"
            },
            { type: 'Produces', value: '[application/json]' },
            {
              type: 'MethodName',
              value: "getUssdString;POST;'api/ussd-string';{};{userid:1};{amount:5000userid:454bankCode:322};{}"
            },
            { type: 'Consumes', value: '[application/json,application/xml]' },
            {
              type: 'MethodName',
              value: "GetCustomerDetails;POST;'api/customer-details';{};{};{};null"
            },
            { type: 'Consumes', value: '[application/json,application/xml]' },
            { type: 'Produces', value: '[application/json,text/csv]' }
          ]
          */
    while (counter < allTokenValues.length) {
        let currentLine = allTokenValues[counter];
        //const splitByQuote = currentLine.split('\'')
        //currentLine = currentLine[0] == '\'' 
        counter += 1;
        const { type, value } = currentLine;
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
