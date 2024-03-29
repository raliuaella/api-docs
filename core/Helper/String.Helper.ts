import { createHash, randomBytes } from "crypto";
import { hostname } from "os";
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

const maxLength = 36;
const host = createHash('md5').update(hostname()).digest('hex').substring(0, 6); // 6 xters
const service = 'USSD'; // service name, 3 xters
const processId = ('' + process.pid).padStart(3, '0'); // 3 xters
export const generateTokenId = () => {
  const time = new Date().getTime(); // 13 xters
  const wildcard = randomBytes(256 / 8)
    .toString('hex')
    .substring(0, 7); // 7 xters
  return `${time}-${host}-${service}-${processId}-${wildcard}`
    .substring(0, maxLength)
    .toUpperCase();
};