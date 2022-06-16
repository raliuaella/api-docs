import { LexerTokenTypes } from "./LexerTokenTypes"

export type LexerTokens = {
    KeyName: string,
    KeyValue: any,
    KeyDataType: string,
    TokenType: string,
    ControllerPath: string,
    Headers: any | null,
    RequestName?: string | null | undefined
    
}

export const ValidHttpMethods: string[] = ['GET', 'POST', 'PUT', 'OPTIONS', 'HEAD', 'DELETE']