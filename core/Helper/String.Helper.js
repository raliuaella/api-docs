"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = exports.StringIsNullOrEmpty = exports.parseParams = exports.parseQuery = exports.JoinWith = exports.NotNull = void 0;
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
