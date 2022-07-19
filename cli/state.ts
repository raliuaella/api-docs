export class CliState {
    private static _cliOptions:object={}

    static set clioptions(value:any) {
        
        CliState._cliOptions = value;
    }

    static get clioptions(): object {return this._cliOptions}
}