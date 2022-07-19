# Api-Docs-Generator

Api-Docs-Generator is a nodejs library that automatically generate postman collection, postman api documentation and gitbook.
Although this is a preview version, which means the library will and continue to undergo serious testing and contributions from anyone interested in the project. Api Documentation and Gitbook will be available in subsequent version.

## Installation

To Install please run npm install or yarn, see sample below

```bash
npm install apidocs
yarn add apidocs
```

## Usage
To use this library to generate postman collection of your project, here is what you need to do.
For this library to work effectively, your controller class/functions needs to be decorated with some attribute and  each line of these attributes will start with ///.
The type of decoration to use depends on what you are trying to achieve.

For example, your controller class can be marked as @Controller(UserController, api/v1/user) or @Controller(UserController)


## Detailed Guide
The library expect you to define a file named api-docs.json at the root of your project, although this can be overriden in cli with filename of your choice. See below for content of the file

```apidocs.json
{
    "AppTitle":"json_schema",
    "Description":"The USSD WALLET FUNDING",
    "BaseUrl":"https://ussd.aellapp.com",
    "BasePath":"api/v2",
    "Host":"ussd.aellapp.com",
    "Headers":{
        "Content-Type":"application/json",
        "x-aella-user":"v1"
    },
    "OutputDir":"Samples",
    "dirToCrawl":".",
    "dirToIgnore":[".gitignore", "*.json"]
}
```
The <strong>OutputDir </strong> specify the directory where the collection file will be generated to,
dirToIgnore specifify the list of files/directories to ignore while crawling/scanning your directory for attributes used to generate file, <strong>
dirToCrawl </strong> specify the directory that will be used for scanning of the directories. It is default to . except you specify otherwise

after the the library has scanned and reviewed the content of api-docs.json, please run 
<br />
```cli  
    apidocs init --file=docs.json where --file will be specified when you need to override the default configuration settings
```

List Of Attribute
Note: {}  means required, [] means optional <br />
<strong>@Controller({ControllerName}, [ControllerPath]) </strong> = ControllerName is the name of controller, controller path is path/route of the controller that other endpiont witll follow e.g. api/v2/usercontroller etc

Method can come in two forms <br />
(a) @Method({MethodName};{HttpMethod};{EndpointPath})
(b) Method=({MethodName};{HttpMethod};{EndpointPath}) <br />

If you follow above pattern, then the values provided inside the parenthesis will be splitted by <strong>; (comma)</strong>. Otherwise, you can specify your endpoint method in the following <br />

<strong>@{Httpmethod>}({RequestName};{EndpointPath})
@MethodName({Requestname}) </strong>
HttpMethod can be any of the following [POST, GET, HEAD, PUT, OPTIONS, DELETE etc], if you define your endpoint <br />

<strong>@Query({pageIndex:1})</strong> @Query is use to specify query string of your endpoint <br />
<strong>@Params({})</strong> @Params is used to specify route params on your endpoint

<strong>@Headers({})</strong> @Headers is used to specify the list of headers on your endpoint<br />
<strong>@Body({})</strong> @Body is used to specify the body request of your endpoint

## Typical Example
See below an example of how to use the attributes explained above
```cli
/// @Controller(WalletController, 'api/wallet')
  export class WalletFundingController {
   // private serviceName: string;
    constructor() {
      this.serviceName = this.config.get<string>('SERVICE_NAME');
    }

     /// Method=BankLisiting;GET;'bank-listing')
    /// @Produces([application/json])
    /// Query({pageIndex:1,pageSize:10})
    /// @Description('returns list of banks in the system')
    /// @Folder([Bank, Listing]) for version 2.0
    async BankShortCodeListing() {
       
     // return SuccessResponse(res, await this.service.ListBanks(), this.serviceName);
    }
  }

```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)