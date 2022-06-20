import { PathLike } from "fs";

export type DirectoryCrawlerOptions = {
    glob?:string | null, path?: PathLike | null,
    ignore?:string[],
    directoryToRead?: string | string[]
}