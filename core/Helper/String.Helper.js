"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTokenId = exports.unique = exports.StringIsNullOrEmpty = exports.parseParams = exports.parseQuery = exports.JoinWith = exports.NotNull = void 0;
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
