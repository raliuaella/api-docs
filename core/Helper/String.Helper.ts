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

export const parseQuery = (input: string): string => {
    // '{userid:1}'
    const inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')','')

    const parsedObject = inputParseObject
    const splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',')

    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    let outputstring = '?';

    for(let s of splittedString) {
        const obj = s.split(":")
        outputstring += `${obj[0]}=${obj[1]}&`
    }

    return outputstring
    // const parsedObject = Object.create(JSON.parse(JSON.stringify(inputParseObject)))

    // let outputstring = '';

    // for(let key of Array.from(Object.keys(parsedObject))) {
    //     const currentString = `${key}=${parsedObject[key]}&`
    //     outputstring += currentString
    // }

    // return outputstring
}

export const parseParams = (input: string): string => {
    const inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')','')
    const parsedObject = inputParseObject
    const splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',')

    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    let outputstring = '/';

    for(let s of splittedString) {
        const obj = s.split(":")
        outputstring += `{{${obj[0]}}}`
    }

    return outputstring
}

export const StringIsNullOrEmpty = (input: string): boolean => {
    return input == 'null' || input == null || input == undefined 
        || input  =='' || input == ' ' || input == '{}' 
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