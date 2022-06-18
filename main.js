"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DirectoryCrawler_1 = require("./core/DirectoryCrawler");
const FileScanner_1 = require("./core/FileScanner");
const Lexer_1 = require("./core/lexer/Lexer");
//import { Parser } from "./core/Parser";
// file scabber
const dir = new DirectoryCrawler_1.DirectoryCrawler({ path: __dirname });
const files = dir.walk();
const fsScanner = new FileScanner_1.FileScanner(files[2], { isRelative: false });
const _lexer = (0, Lexer_1.lexer)(fsScanner.ReadAllLines());
// const _parser = Parser(_lexer, {
//     AppTitle: "Sample postMancolletion",
//     BaseUrl: "http://localhost:5000/wallet"
// })
console.log(_lexer);
