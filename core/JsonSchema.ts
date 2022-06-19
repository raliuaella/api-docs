
import { writeFileSync } from "fs";
import { Collection } from "postman-collection";
import { ApiDocsOptions } from "./ApiDocsOptions";
import { JoinWith } from "./Helper/String.Helper";
import { LexerTokens } from "./lexer/LexerTokens.type";
import { LexerTokenTypes } from "./lexer/LexerTokenTypes";
import { Swagger } from "./swagger.type";

export class JsonSchema {

    constructor(private inputs: LexerTokens[], private options: ApiDocsOptions) {
       // this.constructSwaggerObject()
    }
    private jsonObject: Swagger = { "info": {}, paths: {} }
    public toJSON(): string {
        return JSON.parse(JSON.stringify(this.jsonObject))
    }

    private CreateFolder(folders: string, lexers: LexerTokens[]) {
        let parent = folders;
        let len = folders.length - 1
        let counter = 0

        let item: any[] = []

        // if(folders.length == 0)
        //     return item;

        let allParentElement: LexerTokens[] = []
        for (let lexer of lexers) {
            const _folders = lexer.Folder as string[];
            const firstElement = _folders[0]
            if (firstElement == parent)
                allParentElement.push(lexer)
        }
        //   while(counter < len) {

        for (let t of allParentElement) {
            const currentInput = t


            let mItemsItem = {
                name: parent,
                item: {} as any
            }



            mItemsItem.item["name"] = currentInput.RequestName
            let request: any = {}
            //  for(let t of tokenCollections) {

            if (t.TokenType.toUpperCase() == LexerTokenTypes.Method.toUpperCase()) {
                const methodPath: any = t.KeyValue

                let url = JoinWith('/', '/' + currentInput.ControllerPath.replace(/[\',\"]+/g, ''), methodPath["path"].replace(/[\',\"]+/g, ''))
                let queries = []
                let paramsvalue = []
                if (t.Query) {
                    let query: any = t.Query
                    let urlquery = '?'
                    for (let s of Array.from(Object.keys(query))) {
                        urlquery += `${s}=${query[s]}&`
                        queries.push({
                            key: s,
                            name: s,
                            value: query[s]
                        })
                    }

                }

                if (t.Params) {
                    let params: any = t.Params
                    let urlquery = '/'
                    for (let s of Array.from(Object.keys(params))) {
                        urlquery += `{{${s}}}`
                        paramsvalue.push(s)

                    }
                    // url += urlquery

                }
                request['url'] = {
                    protocol: "http",
                    query: queries,
                    path: paramsvalue,
                    host: this.options.Host,

                }
                request['description'] = t.Description
                request['method'] = methodPath['HttpMethod'],
                    request['name'] = methodPath['RequestName']
                if (t.Body) {
                    request['body'] = {
                        mode: "raw",
                        raw: JSON.stringify(t.Body),
                        description: t.Description
                    }
                }

                if (t.FormData) {
                    let _formData: any = t.FormData
                    let formData = []
                    for (let s of Array.from(Object.keys(_formData))) {
                        formData.push({
                            key: s,
                            name: s,
                            value: _formData[s]
                        })
                    }

                    request['body'] = {
                        formData
                    }
                }

                if (t.FileType) {
                    request['body'] = {
                        file: t.FileType
                    }
                }
                if (t.Headers) {
                    request['header'] = []
                    let _header: any = t.Headers
                    for (let s of Array.from(Object.keys(_header))) {
                        request.header.push({
                            key: s,
                            name: s,
                            value: _header[s]
                        })
                    }
                }
            }



            mItemsItem.item['request'] = request
            mItemsItem.item["description"] = {
                content: t.Description,
                type: t.Consumes
            }

            item.push(mItemsItem)
        }

        counter += 1

        // }

        return item

    }

    public CreateCollection() {
        const info = {
            "name": this.options.AppTitle + "_Collection",
            "version": <string>this.options.version
        }
        //console.log(this.inputs)

        let items = [] // outer item
        for (let t of this.inputs) {

            if (t.RequestName) {
                let item: any = {} // inner items
                const currentInput = t

                item["name"] = currentInput.RequestName
                let request: any = {}
                //  for(let t of tokenCollections) {

                if (t.TokenType.toUpperCase() == LexerTokenTypes.Method.toUpperCase()) {
                    const methodPath: any = t.KeyValue

                    let url = JoinWith('/', '/' + currentInput.ControllerPath.replace(/[\',\"]+/g, ''), methodPath["path"].replace(/[\',\"]+/g, ''))
                    let urlParam='';
                    let queries = []
                    let paramsvalue = []
                    if (t.Query) {
                        let query: any = t.Query
                        let urlquery = '?'
                        for (let s of Array.from(Object.keys(query))) {
                            urlquery += `${s}=${query[s]}&`
                            queries.push({
                                key: s,
                                name: s,
                                value: query[s]
                            })
                        }

                    }

                    if (t.Params) {
                        let params: any = t.Params
                        let urlquery = '/'
                        for (let s of Array.from(Object.keys(params))) {
                            urlquery += `{{${s}}}`
                            paramsvalue.push(s)


                        }
                        urlParam += urlquery
                        // url += urlquery

                    }
                    request['url'] = {
                        protocol: "http",
                        query: queries,
                        path: [(methodPath['path']+urlParam).replace(/[\']+/g, '')],
                        host: JoinWith('/',<string>this.options.Host, <string>this.options.BasePath),
                        raw: url+'/'+ methodPath['path']

                    }
                    request['description'] =  {
                        content: t.Description,
                        type: t.Consumes
                    }
                    request['method'] = methodPath['HttpMethod'],
                        request['name'] = methodPath['RequestName']
                    if (t.Body) {
                        request['body'] = {
                            mode: "raw",
                            raw: JSON.stringify(t.Body),
                            description: t.Description
                        }
                    }

                    if (t.FormData) {
                        let _formData: any = t.FormData
                        let formData = []
                        for (let s of Array.from(Object.keys(_formData))) {
                            formData.push({
                                key: s,
                                name: s,
                                value: _formData[s]
                            })
                        }

                        request['body'] = {
                            formData
                        }
                    }

                    if (t.FileType) {
                        request['body'] = {
                            file: t.FileType
                        }
                    }
                    if (t.Headers) {
                        request['header'] = []
                        let _header: any = t.Headers
                        for (let s of Array.from(Object.keys(_header))) {
                            request.header.push({
                                key: s,
                                name: s,
                                value: _header[s]
                            })
                        }
                    }
                }

                item['request'] = request
                //item["description"] =

                items.push(item)

            }



        }
        const collection = new Collection({
            info,
            item: [...items]
        })

        writeFileSync(this.options && this.options.CollectionName ? this.options.CollectionName + '.json' : info.name + '.json',
            JSON.stringify(collection, null, 2))
    }

    private constructSwaggerObject() {

        this.jsonObject["swagger"] = "2.0"
        this.jsonObject["schemes"] = ["https", "http"]
        this.jsonObject.info = {
            description: this.options.Description,
            title: this.options.AppTitle,
            version: this.options.version,
            contact: {
                email: "apiteam@aellapp.com"
            },
            "license": {
                "name": "Apache 2.0",
                "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
            },
            host: this.options.Host,
            basePath: this.options.BasePath,
        }
        const controllers: string[] = this.inputs.filter(x => x.KeyName.toLowerCase().includes('controller'))
            .map((v: LexerTokens) => { return v.KeyName })
        controllers.forEach((v: string) => {
            this.jsonObject.tags?.push({
                name: v,
                description: v
            })
        })

        let paths: any = {}
        let counter = 0;

        const tokenCollections = this.inputs.filter(x => x.KeyName.toLowerCase().includes('method'))
        while (counter < tokenCollections.length) {
            const currentToken = tokenCollections[counter]
            counter += 1

            // v.KeyDataType.toLowerCase() == 'object' ? v.KeyValue["query"]:null
            const methodPath: any = currentToken.KeyValue
            const currentPath = JoinWith('/', '/' + currentToken.ControllerPath.replace(/[\',\"]+/g, ''), methodPath["path"].replace(/[\',\"]+/g, ''))

            console.log("crp", currentPath)
            //    Object.defineProperty(paths, currentPath, {
            //        enumerable:true,
            //        writable:true,
            //        "configurable": true
            //    })

            const parameters = [];

            if (currentToken.Query) {
                const query: any = currentToken.Query;
                for (let v of Array.from(Object.keys(query))) {
                    parameters.push({
                        name: v,
                        in: "query",
                        description: `${v} of ${currentToken.RequestName}`,
                        type: typeof (query[v]) == "number" ? "integer" : typeof (query[v]),
                        format: ""
                    })
                }

            }
            if (currentToken.Body) {
                let body = {
                    name: "body",
                    in: "body",
                    description: currentToken.Description,
                    required: true,
                    schema: {
                        "$ref": `#/definitions/${currentToken.RequestName?.toLowerCase()}`
                    }
                }
                parameters.push(body)
            }

            if (currentToken.FormData) {
                const params: any = currentToken.FormData;
                for (let v of Array.from(Object.keys(params))) {
                    parameters.push({
                        name: v,
                        in: "formData",
                        description: currentToken.Description,
                        type: 'file'
                    })
                }
            }

            if (currentToken.Params) {
                /*
                {
                    "name": "petId",
                    "in": "path",
                    "description": "ID of pet to return",
                    "required": true,
                    "type": "integer",
                    "format": "int64"
                  }
                  */
                const params: any = currentToken.Params;
                for (let v of Array.from(Object.keys(params))) {
                    parameters.push({
                        name: v,
                        in: "path",
                        description: `${v} of ${currentToken.RequestName}`,
                        type: typeof (params[v]) == "number" ? "integer" : typeof (params[v]),
                        format: ""
                    })
                }

            }
            paths[currentPath[methodPath.HttpMethod]] = {
                operationId: methodPath.RequestName,
                consumes: currentToken.Consumes,
                produces: currentToken.Produces,
                description: currentToken.Description,
                summary: currentToken.Description,
                parameters
            }
        }

        this.jsonObject.paths = paths

    }
}