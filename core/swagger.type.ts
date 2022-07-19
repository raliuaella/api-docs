export type Swagger = {
    swagger?: string,
    info: object,
    tags?: Array<SwaggerTags>,
    schemes?: Array<string>,
    paths: object
}

export type SwaggerTags = {
    name: string,
    description?: string,
      
}