import { createHash, randomBytes } from "crypto";
import { hostname } from "os";
import { LexerTokens, TokenValue } from "../lexer/LexerTokens.type";

export const NotNull = (target: any, propertyName: string, parameterIndex: number) => {
    let descriptor: PropertyDescriptor = {}
    let value = descriptor.value

    descriptor.get = function () {
        if (value == null || value == undefined)
            return false;
        return true;
    }

}

export const JoinWith = (sep: string, ...items: string[]): string => {

    return items.join(sep)
}

export const parseQuery = (input: string): string => {
    // '{userid:1}'
    const inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')', '')

    const parsedObject = inputParseObject
    const splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',')

    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    let outputstring = '?';

    for (let s of splittedString) {
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

export const alllinesThatBeginWith = (testChar: RegExp, inputs: string[]): string[] => {
    const newLinesRegex = new RegExp(testChar) // this method is not that efficient enough

    let matchStrings: string[] = [];

    for (let input of inputs) {
        input = input.trim()
        //console.log(input)
        const isMatch: boolean = newLinesRegex.test(input)
        if(isMatch || input.startsWith('///'))
            matchStrings.push(input)
    }


    return matchStrings
}

export const explode = (sep:string, input: string): string[] => {
    return input.split(sep)
}
export const simpleStringToObject = (input: string): object => {
    const splittedString = explode(",", input)
    let object:any = {}
    splittedString.forEach((v:string)=>{
        const currentValue = explode(":", v.replace(/[\{,\}]/g, ''))
        object[currentValue[0]] = currentValue[1]
    })

    return object
}
export const getAllTokenValues = (inputs: string[]): TokenValue[] => {
    const matchString = /^['controller', '@controller', 'method', '@method', 'produces', '@produces', 'consumes', '@consumes', '@folder']$/ig
    const regex = new RegExp(matchString)
    let response: TokenValue[] = []
    for(let input of inputs) {
        input = input.replace(/^\/\/\//g, '')
        const matchedIndex: number  = 0
      //  console.log(input)
      const splitInput = input.split("=")
      //console.log(splitInput)
      if(splitInput.length == 2) {
          const value = {
              type: splitInput[0].trim(),
              value: splitInput[1].replace(/[\(,\)]/g, '')
          }
          response.push(value)
      }

      if(splitInput.length == 1) {
          const resplit = splitInput[0].split('(')
         // console.log(resplit[1])
          if(resplit.length > 1) {

            const value = {
                type: resplit[0].trim().replace('@', ''),
                value: resplit[1].replace(/\)/g, '')
            }
            response.push(value)
          }
        
      }
    }

    return response
}

export const parseParams = (input: string): string => {
    const inputParseObject = input.replace(/[\']+?/, '').replace('(', '').replace(')', '')
    const parsedObject = inputParseObject
    const splittedString = (parsedObject.replace('{', '').replace('}', '')).split(',')

    // {pageIndex:1,pageSize:10} = pageIndex:1,pageSize:10
    let outputstring = '/';

    for (let s of splittedString) {
        const obj = s.split(":")
        outputstring += `{{${obj[0]}}}`
    }

    return outputstring
}

export const StringIsNullOrEmpty = (input: string): boolean => {
    return input == 'null' || input == null || input == undefined
        || input == '' || input == ' ' || input == '{}'
}

export const unique = (inputs: LexerTokens[]): LexerTokens[] => {
    let resp: LexerTokens[] = []

    for (let token of inputs) {
        let includes = resp.filter(x => x.KeyName == token.KeyName).length == 0

        if (!includes)
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