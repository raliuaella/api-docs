"use strict";
exports.__esModule = true;
exports.generateTokenId = exports.unique = exports.StringIsNullOrEmpty = exports.parseParams = exports.getAllTokenValues = exports.simpleStringToObject = exports.explode = exports.alllinesThatBeginWith = exports.parseQuery = exports.JoinWith = exports.NotNull = void 0;
var crypto_1 = require("crypto");
var os_1 = require("os");
var NotNull = function (target, propertyName, parameterIndex) {
    var descriptor = {};
    var value = descriptor.value;
    descriptor.get = function () {
        if (value == null || value == undefined)
            return false;
        return true;
    };
};
exports.NotNull = NotNull;
var JoinWith = function (sep) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    return items.join(sep);
};
exports.JoinWith = JoinWith;
var parseQuery = function (input) {
    // '{userid:1}'
    var inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')', '');
    var parsedObject = inputParseObject;
    var splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',');
    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    var outputstring = '?';
    for (var _i = 0, splittedString_1 = splittedString; _i < splittedString_1.length; _i++) {
        var s = splittedString_1[_i];
        var obj = s.split(":");
        outputstring += "".concat(obj[0], "=").concat(obj[1], "&");
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
var alllinesThatBeginWith = function (testChar, inputs) {
    var newLinesRegex = new RegExp(testChar); // this method is not that efficient enough
    var matchStrings = [];
    for (var _i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
        var input = inputs_1[_i];
        input = input.trim();
        //console.log(input)
        var isMatch = newLinesRegex.test(input);
        if (isMatch || input.startsWith('///'))
            matchStrings.push(input);
    }
    return matchStrings;
};
exports.alllinesThatBeginWith = alllinesThatBeginWith;
var explode = function (sep, input) {
    return input.split(sep);
};
exports.explode = explode;
var simpleStringToObject = function (input) {
    var splittedString = (0, exports.explode)(",", input);
    var object = {};
    splittedString.forEach(function (v) {
        var currentValue = (0, exports.explode)(":", v.replace(/[\{,\}]/g, ''));
        object[currentValue[0]] = currentValue[1];
    });
    return object;
};
exports.simpleStringToObject = simpleStringToObject;
var getAllTokenValues = function (inputs) {
    var matchString = /^['controller', '@controller', 'method', '@method', 'produces', '@produces', 'consumes', '@consumes', '@folder']$/ig;
    var regex = new RegExp(matchString);
    var response = [];
    for (var _i = 0, inputs_2 = inputs; _i < inputs_2.length; _i++) {
        var input = inputs_2[_i];
        input = input.replace(/^\/\/\//g, '');
        var matchedIndex = 0;
        //  console.log(input)
        var splitInput = input.split("=");
        //console.log(splitInput)
        if (splitInput.length == 2) {
            var value = {
                type: splitInput[0].trim(),
                value: splitInput[1].replace(/[\(,\)]/g, '')
            };
            response.push(value);
        }
        if (splitInput.length == 1) {
            var resplit = splitInput[0].split('(');
            // console.log(resplit[1])
            if (resplit.length > 1) {
                var value = {
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
var parseParams = function (input) {
    var inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')', '');
    var parsedObject = inputParseObject;
    var splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',');
    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    var outputstring = '/';
    for (var _i = 0, splittedString_2 = splittedString; _i < splittedString_2.length; _i++) {
        var s = splittedString_2[_i];
        var obj = s.split(":");
        outputstring += "{{".concat(obj[0], "}}");
    }
    return outputstring;
};
exports.parseParams = parseParams;
var StringIsNullOrEmpty = function (input) {
    return input == 'null' || input == null || input == undefined
        || input == '' || input == ' ' || input == '{}';
};
exports.StringIsNullOrEmpty = StringIsNullOrEmpty;
var unique = function (inputs) {
    var resp = [];
    var _loop_1 = function (token) {
        var includes = resp.filter(function (x) { return x.KeyName == token.KeyName; }).length == 0;
        if (!includes)
            resp.push(token);
    };
    for (var _i = 0, inputs_3 = inputs; _i < inputs_3.length; _i++) {
        var token = inputs_3[_i];
        _loop_1(token);
    }
    return resp;
};
exports.unique = unique;
var maxLength = 36;
var host = (0, crypto_1.createHash)('md5').update((0, os_1.hostname)()).digest('hex').substring(0, 6); // 6 xters
var service = 'USSD'; // service name, 3 xters
var processId = ('' + process.pid).padStart(3, '0'); // 3 xters
var generateTokenId = function () {
    var time = new Date().getTime(); // 13 xters
    var wildcard = (0, crypto_1.randomBytes)(256 / 8)
        .toString('hex')
        .substring(0, 7); // 7 xters
    return "".concat(time, "-").concat(host, "-").concat(service, "-").concat(processId, "-").concat(wildcard)
        .substring(0, maxLength)
        .toUpperCase();
};
exports.generateTokenId = generateTokenId;
