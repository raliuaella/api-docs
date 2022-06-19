import { DirectoryCrawlerOptions } from "./DirectoryCrawlerOptions";
import { Dirent, fstat, fstatSync, PathLike, readdir, readdirSync, Stats, statSync } from 'fs'
import path from "path";
import { glob, GlobSync } from 'glob'

export class DirectoryCrawler {
    constructor(private options: DirectoryCrawlerOptions) { }

    public walk(): string[] {
        let _files: string[] = [];
        const dirPath = <PathLike>this.options.path
        let ignoredFolders = this.options.ignore ? this.options.ignore : []

        
        for (let folder in ignoredFolders) {

            let ignores = new GlobSync(path.join(dirPath.toString(), folder))
            if(ignores.found) {
                console.log("found", ignores.found)
               // this.filesOrFoldersToIgnore.push(...ignores.found)
            }
            // glob(folder, (er, matches) => {
            //     if (!er) {
            //         this.filesOrFoldersToIgnore.push(...matches)
            //     }
            // })
        }
        console.log("toIgnore", this.filesOrFoldersToIgnore)
        _files.push(...this.WalkDir(dirPath, this.filesOrFoldersToIgnore))
        return _files
    }

    private filesOrFoldersToIgnore: string[] = []

    public WalkDir(dir: any, ignoreFolders: string[]) {
        const paths: any[] = [];
        const dirs = [dir];
        var i = 0;

        while (i < dirs.length) {
            const dir = dirs[i];
            const dirents = readdirSync(dir);
            dirents.forEach((f) => {

                // fstat(dirent, (er, stat: Stats)=>{
                let fullPath: string = `${dir}${path.sep}${f}`;
                //console.log("direct " + fullPath)
                let fileStat = statSync(fullPath)

                if (!(ignoreFolders.includes(f))) {


                    if (fileStat.isDirectory()) {

                        dirs.push(fullPath);
                    } else {

                        paths.push(fullPath);


                    }

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