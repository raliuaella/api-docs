import { DirectoryCrawler } from "./core/DirectoryCrawler";
import { FileScanner } from "./core/FileScanner";
import { lexer } from "./core/lexer/Lexer";
import { Parser } from "./core/Parser";

// file scabber
const dir = new DirectoryCrawler({path:__dirname})
const files: string[] = dir.walk()

const fsScanner = new FileScanner(files[2], {isRelative:false})

const _lexer = lexer(fsScanner.ReadAllLines())
// const _parser = Parser(_lexer, {
//     AppTitle: "Sample postMancolletion",
//     BaseUrl: "http://localhost:5000/wallet"
// })
console.log(_lexer)