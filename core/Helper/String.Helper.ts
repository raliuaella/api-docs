import { LexerTokens } from "../lexer/LexerTokens.type";

export const NotNull = (target: any, propertyName: string, parameterIndex:number) => {
    let descriptor: PropertyDescriptor ={}
    let value = descriptor.value

    descriptor.get = function() {
        if(value == null || value == undefined)
            return false;
        return true;
    }

}

export const JoinWith = (sep: string, ...items: string[]): string => {

        return items.join(sep)
}

export const unique = (inputs: LexerTokens[]): LexerTokens[]=> {
    let resp: LexerTokens[] = []

    for(let token of inputs) {
        let includes = resp.filter(x=>x.KeyName == token.KeyName).length == 0

        if(!includes)
            resp.push(token)
    }

    return resp
}