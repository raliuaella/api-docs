import { DirectoryCrawlerOptions } from "./DirectoryCrawlerOptions";
import {Dirent, fstat, fstatSync, PathLike, readdir, readdirSync, Stats, statSync} from 'fs'
import path from "path";

export class DirectoryCrawler {
    constructor(private options: DirectoryCrawlerOptions){}

    public walk(): string[] {
        let _files: string[] = [];
        const dirPath = <PathLike>this.options.path
        _files.push(...this.WalkDir(dirPath, null))
        return _files
    }

    public WalkDir(dir:any, options:any) {
        const paths:any[] = [];
        const dirs = [dir];
        var i = 0;
        while (i < dirs.length) {
            const dir = dirs[i];
            const dirents =  readdirSync(dir);
            dirents.forEach((f) => {
                
               // fstat(dirent, (er, stat: Stats)=>{
                let fullPath:string = `${dir}${path.sep}${f}`;
                //console.log("direct " + fullPath)
                   let fileStat =  statSync(fullPath)
    
                        if (fileStat.isDirectory()) {
                            if(!(fullPath == "node_modules" || fullPath.includes("node_modules")))
                                dirs.push(fullPath);
                        } else {
                            paths.push(fullPath);
                        }
            });
            ++i;
        }
        return paths;
    }

   
    // private WalkDir(files:Dirent[]): string[] {
    //     let _files: string[] = [];
    //     const dirs = [files];
    //     var i = 0;

    //     while(i < dirs.length) {
    //         const dir = dirs[i];
    //         const dirents =  readdirSync(dir);

    //         ++i;
    //     }
    //     files.forEach((dirent: Dirent)=>{
            
    //         if(dirent.isDirectory())
    //             this.WalkDir([dirent])
            
    //         if(dirent.isFile()) {
    //             const basename = path.basename(path.dirname(dirent.name))
    //             const filePath =  `${basename}${path.sep}${dirent.name}`
    //             _files.push(filePath)
    //         }
    //     })

    //     return _files
    // }
}