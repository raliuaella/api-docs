import { LexerTokenTypes } from "./LexerTokenTypes"

export type LexerTokens = {
    _id: string,
    KeyName: string,
    KeyValue: any,
    KeyDataType: string,
    TokenType: string,
    ControllerPath: string,
    Headers: any | null,
    RequestName?: string | null | undefined,
    FullUrl?: string | null | undefined,
    Consumes?: Array<string> | null | undefined,
    Produces?: Array<string> | null | undefined
    
    
}

export const ValidHttpMethods: string[] = ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE']