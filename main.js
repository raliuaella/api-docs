"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DirectoryCrawler_1 = require("./core/DirectoryCrawler");
const FileScanner_1 = require("./core/FileScanner");
const JsonSchema_1 = require("./core/JsonSchema");
const Lexer_1 = require("./core/lexer/Lexer");
//import { Parser } from "./core/Parser";
// file scabber
const dir = new DirectoryCrawler_1.DirectoryCrawler({ path: __dirname });
const files = dir.walk();
//console.log(files)
const fsScanner = new FileScanner_1.FileScanner(files[4], { isRelative: false });
//console.log(fsScanner.ReadAllLines())
const _lexer = (0, Lexer_1.lexer)(fsScanner.ReadAllLines());
// const _parser = Parser(_lexer, {
//     AppTitle: "Sample postMancolletion",
//     BaseUrl: "http://localhost:5000/wallet"
// })
const schema = new JsonSchema_1.JsonSchema(_lexer, {
    "AppTitle": "Ussd Wallet Funding",
    "BasePath": "api/v1",
    "Host": "localhost:8090",
    BaseUrl: "http://localhost:8090",
    CollectionName: "Sample_Collect"
});
schema.CreateCollection();
