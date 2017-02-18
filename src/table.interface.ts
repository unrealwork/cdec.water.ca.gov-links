export class Table {
    private headers: string[];
    private rows: string[][];


    constructor() {
        this.headers = [];
        this.rows = [];
    }

    public addHeader(header: string): void {
        this.headers.push(header);
    }

    public addRow(row: string[]): void {
        this.rows.push(row);
    }

    public getColumn(name: string): string[] {
        let headerIndex = this.headers.indexOf(name);
        if (headerIndex > -1) {
            let resultColumn: string[] = [];
            for (let row of this.rows) {
                resultColumn.push(row[headerIndex]);
            }
            return resultColumn;
        } else {
            throw new Error('Table doesn\'t contains header' + name)
        }
    }

}