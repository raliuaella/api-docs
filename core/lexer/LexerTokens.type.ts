import { LexerTokenTypes } from "./LexerTokenTypes"

export type LexerTokens = {
    _id: string,
    KeyName: string,
    KeyValue: object | string ,
    KeyDataType: string,
    TokenType: string,
    ControllerPath: string,
    Headers?: object | null,
    Query?: object | null,
    Params?: object | null,
    RequestName?: string | null | undefined,
    FullUrl?: string | null | undefined,
    Consumes?: Array<string> | null | undefined,
    Produces?: Array<string> | null | undefined,
    Body?: object | null,
    Description?: string | null,
    FormData?: object | null,
    FileType?: object | string | null
    Folder?: Array<string> | null
    Path?: string | null
    ControllerName?: string
    
    
}

export const ValidHttpMethods: string[] = ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE']

export type TokenValue = {
    type: string,
    value: string
}