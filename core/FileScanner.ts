import {existsSync, fstat, readFileSync, stat, Stats, statSync} from "fs"
import path from "path";
import { FileScannerOptions } from "../configuration/FileScannerOptions";

// 15.45HR - lnx, jang, basher, doc_t204(fly)

export class FileScanner {
    constructor(private filePath: string, private options: FileScannerOptions){

        this.Validate()
    }

    private Validate(): boolean {
        const exist: boolean = existsSync(this.filePath)

        if(!exist)
            throw new Error("file not found, is this relative to current directory??")
        
        let isDirectory: boolean = false;
        this.filePath = this.options && this.options.isRelative ? path.join(__dirname, this.filePath): this.filePath

        const fileStat: Stats = statSync(this.filePath)

        if(!fileStat.isFile())
            throw new Error("this is not a file type")

        return true
    }

    ReadAllLines() {
        const filePath =  this.options && this.options.isRelative ? path.join(__dirname, this.filePath): this.filePath
        const fileContents: string = (Buffer.from(readFileSync(filePath))).toString()
        const allines: string[] = fileContents.split(/\r?\n/)

        return allines
    }

    /*
    public Scan(): [filepath:string, files: Array<string>] {
        return;
    }*/
}