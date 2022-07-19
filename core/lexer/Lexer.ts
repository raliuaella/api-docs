import { Console } from "console";
import { EnumToList } from "../Helper/Enum.Helper";
import { alllinesThatBeginWith, generateTokenId, getAllTokenValues, simpleStringToObject, unique } from "../Helper/String.Helper";
import { Identify } from "./identifier.enum";
import { LexerTokens, TokenValue } from "./LexerTokens.type";
import { LexerTokenTypes } from "./LexerTokenTypes";

export const lexer = (inputs: string[]) => {
    let lines = [...inputs]
    //console.log("lines length " + lines.length)
    const newLines = [...alllinesThatBeginWith(/^\/\/\//ig, lines)]
   // console.log('neLines ', newLines)
    lines = [...newLines]
    let allTokenValues = getAllTokenValues(lines)
    //console.log(allTokenValues)
    //newLinesRegex.test()
    let counter: number = 0;
    let tokens: LexerTokens[] = [];
    // let identifiersList = EnumToList<Keywords>()
    // let tokenTypeList = EnumToList<LexerTokenTypes>()
    // // console.log("tokenTypeList ", tokenTypeList)
    // let ControllerPath: string = ''
    let currentToken: LexerTokens={_id:'', KeyDataType:'', KeyValue:'', KeyName:'', TokenType:'', ControllerPath:''};
    let controllerName: string = ''

    while (counter < allTokenValues.length) {
        let currentLine: TokenValue = allTokenValues[counter];
        counter += 1

        let { type, value } = currentLine
        type = type.toUpperCase()
        const _id: string = generateTokenId()
        if (type == LexerTokenTypes.Controller.toString().toUpperCase()) {
            let controllervalue =  value.split(',')
            controllerName = controllervalue[0].trim()
            currentToken = {
                _id,
                KeyName: type,
                KeyDataType: typeof(String).name,
                KeyValue: controllervalue[1] ? controllervalue[1].replace(/[\'\"]+/g, ''):controllervalue[0].replace(/[\'\"]+/g, ''),
                ControllerPath: value.trim().replace(/[\'\"]+/g, ''),
                TokenType: LexerTokenTypes.Controller,
                ControllerName: controllerName
            }

            tokens.push(currentToken)

        }

        if(type == LexerTokenTypes.Params.toString().toUpperCase()) {
            const KeyValue = simpleStringToObject(value)
            currentToken.Params = KeyValue
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Consumes.toString().toUpperCase()) {
            const KeyValue = value.split(",")
           
            currentToken.Consumes = []
            
            KeyValue.forEach((v:string)=>{
                currentToken.Consumes?.push(v.trim().replace(/[\[\]]/, ''))
            })
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Folder.toString().toUpperCase()) {
            const KeyValue = value.split(",")
           
            currentToken.Folder = []
            
            KeyValue.forEach((v:string)=>{
                currentToken.Folder?.push(v.trim().replace(/[\[\]]/, ''))
            })
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Description.toString().toUpperCase()) {
            currentToken.Description = value
           
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Produces.toString().toUpperCase()) {
            const KeyValue = value.split(",")
           
            currentToken.Produces = []
            
            KeyValue.forEach((v:string)=>{
                currentToken.Produces?.push(v.trim().replace(/[\[\]]/, ''))
            })
           
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Headers.toString().toUpperCase()) {
            const KeyValue = simpleStringToObject(value)
            currentToken.Headers = KeyValue
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Query.toString().toUpperCase()) {
            const KeyValue = simpleStringToObject(value)
            //console.log("keyValue ", KeyValue)
            currentToken.Query = KeyValue
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if(type == LexerTokenTypes.Body.toString().toUpperCase()) {
            const KeyValue = simpleStringToObject(value)
            currentToken.Body = KeyValue
            const indexOfTokenToUpdate = tokens.findIndex(x=>x._id == currentToken._id)
            //tokens.push(token)
            tokens.splice(indexOfTokenToUpdate, 1, currentToken)
        }

        if (type == LexerTokenTypes.Method.toString().toUpperCase()) {
            const methodKeyValue = value.split(";")
            if (methodKeyValue.length != 3)
                throw new Error("parameter @Method/Method is not properly formatted")
            const token: LexerTokens = {
                _id,
                RequestName: methodKeyValue[0],
                KeyName: type,
                KeyDataType: typeof(Object).name,
                KeyValue: {
                    RequestName: methodKeyValue[0],
                    HttpMethod: methodKeyValue[1],
                    path: methodKeyValue[2]
                },
                ControllerName: controllerName,
                TokenType: LexerTokenTypes.Method,
                ControllerPath: currentToken.ControllerPath
            }
            currentToken = token
            tokens.push(token)
        }


    }

    return tokens;
}


const startWithTripleSlash = (text: string): boolean => {
    return text.startsWith('///')
}

const splitLine = (text: string, matchAll: boolean = true): string[] => {
    return text.split(/[\t\v\s]/)
}

const splitLineByEqual = (text: string): string[] => {
    return text.split("=")
}


