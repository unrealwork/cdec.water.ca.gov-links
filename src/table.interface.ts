export class Table {
    get rows(): string[][] {
        return this._rows;
    }

    get headers(): string[] {
        return this._headers;
    }

    private _headers: string[];
    private _rows: string[][];


    constructor() {
        this._headers = [];
        this._rows = [];
    }

    public addHeader(header: string): void {
        this._headers.push(header);
    }


    public addRow(row: string[]): void {
        this._rows.push(row);
    }

    public getColumn(name: string): string[] {
        let headerIndex = this._headers.indexOf(name);
        if (headerIndex > -1) {
            let resultColumn: string[] = [];
            for (let row of this._rows) {
                resultColumn.push(row[headerIndex]);
            }
            return resultColumn;
        } else {
            throw new Error('Table doesn\'t contains header' + name)
        }
    }

}