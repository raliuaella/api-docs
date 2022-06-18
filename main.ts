import { DirectoryCrawler } from "./core/DirectoryCrawler";
import { FileScanner } from "./core/FileScanner";
import { JsonSchema } from "./core/JsonSchema";
import { lexer } from "./core/lexer/Lexer";
//import { Parser } from "./core/Parser";

// file scabber
const dir = new DirectoryCrawler({ path: __dirname })
const files: string[] = dir.walk()

const fsScanner = new FileScanner(files[2], { isRelative: false })

const _lexer = lexer(fsScanner.ReadAllLines())
// const _parser = Parser(_lexer, {
//     AppTitle: "Sample postMancolletion",
//     BaseUrl: "http://localhost:5000/wallet"
// })
const schema = new JsonSchema(_lexer, {
    "AppTitle": "Ussd Wallet Funding",
    "BasePath":"v1",
    "Host": "http://localhost:8090",
    BaseUrl: "http://localhost:8090"
});
schema.CreateCollection()