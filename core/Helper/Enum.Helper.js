"use strict";
exports.__esModule = true;
exports.EnumToList = void 0;
var LexerTokenTypes_1 = require("../lexer/LexerTokenTypes");
var EnumToList = function () {
    return Object.keys(LexerTokenTypes_1.LexerTokenTypes)
        .filter(function (v) { return !isNaN(Number(v)); })
        .map(function (x, index, array) {
        return {
            id: index,
            name: x
        };
    });
};
exports.EnumToList = EnumToList;
