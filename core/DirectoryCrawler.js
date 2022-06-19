"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryCrawler = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const glob_1 = require("glob");
class DirectoryCrawler {
    constructor(options) {
        this.options = options;
        this.filesOrFoldersToIgnore = [];
    }
    walk() {
        let _files = [];
        const dirPath = this.options.path;
        let ignoredFolders = this.options.ignore ? this.options.ignore : [];
        for (let folder in ignoredFolders) {
            let ignores = new glob_1.GlobSync(path_1.default.join(dirPath.toString(), folder));
            if (ignores.found) {
                console.log("found", ignores.found);
                // this.filesOrFoldersToIgnore.push(...ignores.found)
            }
            // glob(folder, (er, matches) => {
            //     if (!er) {
            //         this.filesOrFoldersToIgnore.push(...matches)
            //     }
            // })
        }
        console.log("toIgnore", this.filesOrFoldersToIgnore);
        _files.push(...this.WalkDir(dirPath, this.filesOrFoldersToIgnore));
        return _files;
    }
    WalkDir(dir, ignoreFolders) {
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
                if (!(ignoreFolders.includes(f))) {
                    if (fileStat.isDirectory()) {
                        dirs.push(fullPath);
                    }
                    else {
                        paths.push(fullPath);
                    }
                }
            });
            ++i;
        }
        return paths;
    }
}
exports.DirectoryCrawler = DirectoryCrawler;
