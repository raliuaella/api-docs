import { LexerTokenTypes } from "../lexer/LexerTokenTypes";

export const EnumToList = <T>() => {
    return Object.keys(LexerTokenTypes)
            .filter((v) => !isNaN(Number(v)))
            .map((x, index, array) =>
            {
                    return {
                            id: index,
                            name: x
                        }
            })
}