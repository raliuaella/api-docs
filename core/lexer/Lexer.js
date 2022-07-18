"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.lexer = void 0;
var String_Helper_1 = require("../Helper/String.Helper");
var LexerTokenTypes_1 = require("./LexerTokenTypes");
var lexer = function (inputs) {
    var lines = __spreadArray([], inputs, true);
    //console.log("lines length " + lines.length)
    var newLines = __spreadArray([], (0, String_Helper_1.alllinesThatBeginWith)(/^\/\/\//ig, lines), true);
    // console.log('neLines ', newLines)
    lines = __spreadArray([], newLines, true);
    var allTokenValues = (0, String_Helper_1.getAllTokenValues)(lines);
    console.log(allTokenValues);
    //newLinesRegex.test()
    var counter = 0;
    var tokens = [];
    // let identifiersList = EnumToList<Keywords>()
    // let tokenTypeList = EnumToList<LexerTokenTypes>()
    // // console.log("tokenTypeList ", tokenTypeList)
    // let ControllerPath: string = ''
    var currentToken = { _id: '', KeyDataType: '', KeyValue: '', KeyName: '', TokenType: '', ControllerPath: '' };
    var controllerName = '';
    while (counter < allTokenValues.length) {
        var currentLine = allTokenValues[counter];
        //const splitByQuote = currentLine.split('\'')
        //currentLine = currentLine[0] == '\'' 
        counter += 1;
        var type = currentLine.type, value = currentLine.value;
        type = type.toUpperCase();
        //console.log("type is", type)
        //console.log("identify is ", LexerTokenTypes.Controller.toString().toUpperCase())
        var _id = (0, String_Helper_1.generateTokenId)();
        if (type == LexerTokenTypes_1.LexerTokenTypes.Controller.toString().toUpperCase()) {
            var controllervalue = value.split(',');
            controllerName = controllervalue[0].trim();
            currentToken = {
                _id: _id,
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
            var KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            currentToken.Params = KeyValue;
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Consumes.toString().toUpperCase()) {
            var KeyValue = value.split(",");
            currentToken.Consumes = [];
            KeyValue.forEach(function (v) {
                var _a;
                (_a = currentToken.Consumes) === null || _a === void 0 ? void 0 : _a.push(v.trim().replace('[', '').replace(']', ''));
            });
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Folder.toString().toUpperCase()) {
            var KeyValue = value.split(",");
            currentToken.Folder = [];
            KeyValue.forEach(function (v) {
                var _a;
                (_a = currentToken.Folder) === null || _a === void 0 ? void 0 : _a.push(v.trim().replace('[', '').replace(']', ''));
            });
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Description.toString().toUpperCase()) {
            currentToken.Description = value;
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Produces.toString().toUpperCase()) {
            var KeyValue = value.split(",");
            currentToken.Produces = [];
            KeyValue.forEach(function (v) {
                var _a;
                (_a = currentToken.Produces) === null || _a === void 0 ? void 0 : _a.push(v.trim().replace('[', '').replace(']', ''));
            });
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Headers.toString().toUpperCase()) {
            var KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            currentToken.Headers = KeyValue;
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Query.toString().toUpperCase()) {
            var KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            //console.log("keyValue ", KeyValue)
            currentToken.Query = KeyValue;
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Body.toString().toUpperCase()) {
            var KeyValue = (0, String_Helper_1.simpleStringToObject)(value);
            currentToken.Body = KeyValue;
            var indexOfTokenToUpdate = tokens.findIndex(function (x) { return x._id == currentToken._id; });
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken);
        }
        if (type == LexerTokenTypes_1.LexerTokenTypes.Method.toString().toUpperCase()) {
            var methodKeyValue = value.split(";");
            if (methodKeyValue.length != 3)
                throw new Error("parameter @Method/Method is not properly formatted");
            var token = {
                _id: _id,
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
var startWithTripleSlash = function (text) {
    return text.startsWith('///');
};
var splitLine = function (text, matchAll) {
    if (matchAll === void 0) { matchAll = true; }
    return text.split(/[\t\v\s]/);
};
var splitLineByEqual = function (text) {
    return text.split("=");
};
