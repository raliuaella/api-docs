"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumToList = void 0;
const LexerTokenTypes_1 = require("../lexer/LexerTokenTypes");
const EnumToList = () => {
    return Object.keys(LexerTokenTypes_1.LexerTokenTypes)
        .filter((v) => !isNaN(Number(v)))
        .map((x, index, array) => {
        return {
            id: index,
            name: x
        };
    });
};
exports.EnumToList = EnumToList;
