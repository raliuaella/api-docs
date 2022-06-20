"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexer = void 0;
const String_Helper_1 = require("../Helper/String.Helper");
const LexerTokenTypes_1 = require("./LexerTokenTypes");
const lexer = (inputs) => {
    let lines = [...inputs];
    //console.log("lines length " + lines.length)
    const newLines = [...(0, String_Helper_1.alllinesThatBeginWith)(/^\/\/\//ig, lines)];
    // console.log('neLines ', newLines)
    lines = [...newLines];
    let allTokenValues = (0, String_Helper_1.getAllTokenValues)(lines);
    //console.log(allTokenValues)
    //newLinesRegex.test()
    let counter = 0;
    let tokens = [];
    // let identifiersList = EnumToList<Keywords>()
    // let tokenTypeList = EnumToList<LexerTokenTypes>()
    // // console.log("tokenTypeList ", tokenTypeList)
    // let ControllerPath: string = ''
    let currentToken = { _id: '', KeyDataType: '', KeyValue: '', KeyName: '', TokenType: '', ControllerPath: '' };
    let controllerName = '';
    while (counter < allTokenValues.length) {
        let currentLine = allTokenValues[counter];
        //const splitByQuote = currentLine.split('\'')
        //currentLine = currentLine[0] == '\'' 
        counter += 1;
        let { type, value } = currentLine;
        type = type.toUpperCase();
        //console.log("type is", type)
        //console.log("identify is ", LexerTokenTypes.Controller.toString().toUpperCase())
        const _id = (0, String_Helper_1.generateTokenId)();
        if (type == LexerTokenTypes_1.LexerTokenTypes.Controller.toString().toUpperCase()) {
            let controllervalue = value.split(',');
            controllerName = controllervalue[0].trim();
            currentToken = {
                _id,
                KeyName: type,
                KeyDataType: typeof (String).name,
                KeyValue: controllervalue[0].replace(/[\'\"]+/g, ''),
                ControllerPath: value.trim().replace(/[\'\"]+/g, ''),
                TokenType: LexerTokenTypes_1.LexerTokenTypes.Controller,
                ControllerName: controllerName
            };
            tokens.push(currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Params.toString().toUpperCase()) {
            const KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            currentToken.Params = KeyValue;
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Consumes.toString().toUpperCase()) {
            const KeyValue = value.split(",");
            currentToken.Consumes = [];
            KeyValue.forEach((v) => {
                var _a;
                (_a = currentToken.Consumes) === null || _a === void 0 ? void 0 : _a.push(v.trim().replace('[', '').replace(']', ''));
            });
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Folder.toString().toUpperCase()) {
            const KeyValue = value.split(",");
            currentToken.Folder = [];
            KeyValue.forEach((v) => {
                var _a;
                (_a = currentToken.Folder) === null || _a === void 0 ? void 0 : _a.push(v.trim().replace('[', '').replace(']', ''));
            });
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Description.toString().toUpperCase()) {
            currentToken.Description = value;
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Produces.toString().toUpperCase()) {
            const KeyValue = value.split(",");
            currentToken.Produces = [];
            KeyValue.forEach((v) => {
                var _a;
                (_a = currentToken.Produces) === null || _a === void 0 ? void 0 : _a.push(v.trim().replace('[', '').replace(']', ''));
            });
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Headers.toString().toUpperCase()) {
            const KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            currentToken.Headers = KeyValue;
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Query.toString().toUpperCase()) {
            const KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            //console.log("keyValue ", KeyValue)
            currentToken.Query = KeyValue;
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Body.toString().toUpperCase()) {
            const KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            currentToken.Body = KeyValue;
            const indexOfTokenToUpdate = tokens.findIndex(x => x._id == currentToken._id);
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Method.toString().toUpperCase()) {
            const methodKeyValue = value.split(";");
            if (methodKeyValue.length != 3)
                throw new Error("parameter @Method/Method is not properly formatted");
            const token = {
                _id,
                RequestName: methodKeyValue[0],
                KeyName: type,
                KeyDataType: typeof (Object).name,
                KeyValue: {
                    RequestName: methodKeyValue[0],
                    HttpMethod: methodKeyValue[1],
                    path: methodKeyValue[2]
                },
                ControllerName: controllerName,
                TokenType: LexerTokenTypes_1.LexerTokenTypes.Method,
                ControllerPath: currentToken.ControllerPath
            };
            currentToken = token;
            tokens.push(token);
        }
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
