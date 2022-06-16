"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileScanner = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
// 15.45HR - lnx, jang, basher, doc_t204(fly)
class FileScanner {
    constructor(filePath, options) {
        this.filePath = filePath;
        this.options = options;
        this.Validate();
    }
    Validate() {
        const exist = (0, fs_1.existsSync)(this.filePath);
        if (!exist)
            throw new Error("file not found, is this relative to current directory??");
        let isDirectory = false;
        this.filePath = this.options && this.options.isRelative ? path_1.default.join(__dirname, this.filePath) : this.filePath;
        const fileStat = (0, fs_1.statSync)(this.filePath);
        if (!fileStat.isFile())
            throw new Error("this is not a file type");
        return true;
    }
    ReadAllLines() {
        const filePath = this.options && this.options.isRelative ? path_1.default.join(__dirname, this.filePath) : this.filePath;
        const fileContents = (Buffer.from((0, fs_1.readFileSync)(filePath))).toString();
        const allines = fileContents.split(/\r?\n/);
        return allines;
    }
}
exports.FileScanner = FileScanner;
