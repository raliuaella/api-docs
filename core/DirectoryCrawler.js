"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryCrawler = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
class DirectoryCrawler {
    constructor(options) {
        this.options = options;
    }
    walk() {
        let _files = [];
        const dirPath = this.options.path;
        _files.push(...this.WalkDir(dirPath, null));
        return _files;
    }
    WalkDir(dir, options) {
        const paths = [];
        const dirs = [dir];
        var i = 0;
        while (i < dirs.length) {
            const dir = dirs[i];
            const dirents = (0, fs_1.readdirSync)(dir);
            dirents.forEach((f) => {
                // fstat(dirent, (er, stat: Stats)=>{
                let fullPath = `${dir}${path_1.default.sep}${f}`;
                //console.log("direct " + fullPath)
                let fileStat = (0, fs_1.statSync)(fullPath);
                if (fileStat.isDirectory()) {
                    if (!(fullPath == "node_modules" || fullPath.includes("node_modules")))
                        dirs.push(fullPath);
                }
                else {
                    paths.push(fullPath);
                }
            });
            ++i;
        }
        return paths;
    }
}
exports.DirectoryCrawler = DirectoryCrawler;
