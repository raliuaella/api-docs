import path from "path";
import { DirectoryCrawler } from "./core/DirectoryCrawler";
import { FileScanner } from "./core/FileScanner";
import { JsonSchema } from "./core/JsonSchema";
import { lexer } from "./core/lexer/Lexer";
//import { Parser } from "./core/Parser";

// file scabber
const dir = new DirectoryCrawler({ path: __dirname, ignore:["node_modules", "*.git", ".git", ".git", ".gitignore"] })
const files: string[] = dir.walk()
console.log(files)
const fsScanner = new FileScanner(files[4], { isRelative: false })
//console.log(fsScanner.ReadAllLines())
const _lexer = lexer(fsScanner.ReadAllLines())
// const _parser = Parser(_lexer, {
//     AppTitle: "Sample postMancolletion",
//     BaseUrl: "http://localhost:5000/wallet"
// })
const schema = new JsonSchema(_lexer, {
    "AppTitle": "Ussd Wallet Funding",
    "BasePath":"api/v1",
    "Host": "localhost:8090",
    BaseUrl: "http://localhost:8090",
    CollectionName: "Sample_Collect"
});
schema.CreateCollection()