"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenId = exports.unique = exports.StringIsNullOrEmpty = exports.parseParams = exports.getAllTokenValues = exports.simpleStringToObject = exports.explode = exports.alllinesThatBeginWith = exports.parseQuery = exports.JoinWith = exports.NotNull = void 0;
const crypto_1 = require("crypto");
const os_1 = require("os");
const NotNull = (target, propertyName, parameterIndex) => {
    let descriptor = {};
    let value = descriptor.value;
    descriptor.get = function () {
        if (value == null || value == undefined)
            return false;
        return true;
    };
};
exports.NotNull = NotNull;
const JoinWith = (sep, ...items) => {
    return items.join(sep);
};
exports.JoinWith = JoinWith;
const parseQuery = (input) => {
    // '{userid:1}'
    const inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')', '');
    const parsedObject = inputParseObject;
    const splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',');
    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    let outputstring = '?';
    for (let s of splittedString) {
        const obj = s.split(":");
        outputstring += `${obj[0]}=${obj[1]}&`;
    }
    return outputstring;
    // const parsedObject = Object.create(JSON.parse(JSON.stringify(inputParseObject)))
    // let outputstring = '';
    // for(let key of Array.from(Object.keys(parsedObject))) {
    //     const currentString = `${key}=${parsedObject[key]}&`
    //     outputstring += currentString
    // }
    // return outputstring
};
exports.parseQuery = parseQuery;
const alllinesThatBeginWith = (testChar, inputs) => {
    const newLinesRegex = new RegExp(testChar); // this method is not that efficient enough
    let matchStrings = [];
    for (let input of inputs) {
        input = input.trim();
        //console.log(input)
        const isMatch = newLinesRegex.test(input);
        if (isMatch || input.startsWith('///'))
            matchStrings.push(input);
    }
    return matchStrings;
};
exports.alllinesThatBeginWith = alllinesThatBeginWith;
const explode = (sep, input) => {
    return input.split(sep);
};
exports.explode = explode;
const simpleStringToObject = (input) => {
    const splittedString = (0, exports.explode)(",", input);
    let object = {};
    splittedString.forEach((v) => {
        const currentValue = (0, exports.explode)(":", v.replace(/[\{,\}]/g, ''));
        object[currentValue[0]] = currentValue[1];
    });
    return object;
};
exports.simpleStringToObject = simpleStringToObject;
const getAllTokenValues = (inputs) => {
    const matchString = /^['controller', '@controller', 'method', '@method', 'produces', '@produces', 'consumes', '@consumes', '@folder']$/ig;
    const regex = new RegExp(matchString);
    let response = [];
    for (let input of inputs) {
        input = input.replace(/^\/\/\//g, '');
        const matchedIndex = 0;
        //  console.log(input)
        const splitInput = input.split("=");
        //console.log(splitInput)
        if (splitInput.length == 2) {
            const value = {
                type: splitInput[0].trim(),
                value: splitInput[1].replace(/[\(,\)]/g, '')
            };
            response.push(value);
        }
        if (splitInput.length == 1) {
            const resplit = splitInput[0].split('(');
            // console.log(resplit[1])
            if (resplit.length > 1) {
                const value = {
                    type: resplit[0].trim().replace('@', ''),
                    value: resplit[1].replace(/\)/g, '')
                };
                response.push(value);
            }
        }
    }
    return response;
};
exports.getAllTokenValues = getAllTokenValues;
const parseParams = (input) => {
    const inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')', '');
    const parsedObject = inputParseObject;
    const splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',');
    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    let outputstring = '/';
    for (let s of splittedString) {
        const obj = s.split(":");
        outputstring += `{{${obj[0]}}}`;
    }
    return outputstring;
};
exports.parseParams = parseParams;
const StringIsNullOrEmpty = (input) => {
    return input == 'null' || input == null || input == undefined
        || input == '' || input == ' ' || input == '{}';
};
exports.StringIsNullOrEmpty = StringIsNullOrEmpty;
const unique = (inputs) => {
    let resp = [];
    for (let token of inputs) {
        let includes = resp.filter(x => x.KeyName == token.KeyName).length == 0;
        if (!includes)
            resp.push(token);
    }
    return resp;
};
exports.unique = unique;
const maxLength = 36;
const host = (0, crypto_1.createHash)('md5').update((0, os_1.hostname)()).digest('hex').substring(0, 6); // 6 xters
const service = 'USSD'; // service name, 3 xters
const processId = ('' + process.pid).padStart(3, '0'); // 3 xters
const generateTokenId = () => {
    const time = new Date().getTime(); // 13 xters
    const wildcard = (0, crypto_1.randomBytes)(256 / 8)
        .toString('hex')
        .substring(0, 7); // 7 xters
    return `${time}-${host}-${service}-${processId}-${wildcard}`
        .substring(0, maxLength)
        .toUpperCase();
};
exports.generateTokenId = generateTokenId;
