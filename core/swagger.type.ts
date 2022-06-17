export type Swagger = {
    swagger?: string,
    info: object,
    tags: Array<SwaggerTags>,
    schemes?: Array<string>
}

export type SwaggerTags = {
    name: string,
    description?: string,
      
}