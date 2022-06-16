"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unique = exports.JoinWith = exports.NotNull = void 0;
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
