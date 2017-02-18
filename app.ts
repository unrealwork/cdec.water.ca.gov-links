import fs = require('fs');
import request = require('request');
import cheerio = require('cheerio')
import {Response} from "_debugger";
import {Table} from  './src/table.interface';

let url: string = 'https://cdec.water.ca.gov/misc/realStations.html';


function parse(url: string): Table {
    let table: Table = new Table();
    request(url, (res: Response, error: any, body: any) => {
        let $ = cheerio.load(body);
        $('table').each((index: number, element: CheerioElement) => {
            $(element).find("tr > th").each((index: number, element: CheerioElement) => {
                table.addHeader($(element).text())
            })
        })
    });
    return table;
}

let table: Table = parse(url);