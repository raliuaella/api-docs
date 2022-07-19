import { DirectoryCrawlerOptions } from "./DirectoryCrawlerOptions";
import { Dirent, existsSync, fstat, fstatSync, PathLike, readdir, readdirSync, readFileSync, Stats, statSync } from 'fs'
import path from "path";
import { glob, GlobSync } from 'glob'

export class DirectoryCrawler {
    constructor(private options: DirectoryCrawlerOptions) { }

    public walk(): string[] {
        let _files: string[] = [];
        const dirPath = <PathLike>this.options.path
        let ignoredFolders = this.options.ignore ? this.options.ignore : []

        // let someToIgnore = ignoredFolders.filter(x=>x.startsWith('.'))
        // let someContentFileToIgnore = this.IgnoreSomeFileContent('.gitignore', '.dockerignore')

        // ignoredFolders.push(...someContentFileToIgnore)
        for (let folder of ignoredFolders) {
            //console.log("fold", folder)

            if (folder != null || folder != ' ' || folder != '') {
                    let ignore = new GlobSync(folder)
                    this.filesOrFoldersToIgnore.push(...ignore.found)
            }
        }

        console.log("toIgnore", this.filesOrFoldersToIgnore)
        _files.push(...this.WalkDir(dirPath, this.filesOrFoldersToIgnore))


        return _files
    }

    private filesOrFoldersToIgnore: string[] = []

    private IgnoreSomeFileContent(...items: string[]): string[] {
        let response: string[] = []
        for (let item of items) {
            let fileExist = existsSync(item)

            if (fileExist) {
                const fileContentBuffer = readFileSync(path.join(<string>this.options.path, item))
                let content = fileContentBuffer.toString().split(/\r?\n/)
                console.log("fsl", content)
                response.push(...content)
            }
            // let stat = statSync(path.join(__dirname, item))
            //  if(stat.isFile()) {

            // }

        }

        return response
    }
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