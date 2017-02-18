import fs = require('fs');
import request = require('sync-request');
import cheerio = require('cheerio')
import {Table} from "./src/table.interface";

let url: string = 'https://cdec.water.ca.gov/misc/realStations.html';


function parse(html): Table {
    let table: Table = new Table();
    let $ = cheerio.load(html);
    $('table').each((index: number, element: CheerioElement) => {
        $(element).find('tr').each(
            (index: number, element: CheerioElement) => {
                if (index == 0) {
                    $(element).find('th').each((index: number, element: CheerioElement) => {
                        table.addHeader($(element).text().trim())
                    })
                } else {
                    let row: string[] = [];
                    $(element).find('td').each((index: number, element: CheerioElement) => {
                        row.push($(element).text().trim());
                    });
                    table.addRow(row);
                }
            });
        $(element).find('tr')
    });
    return table;
}

let res = request('GET', url);
let table: Table = parse(res.getBody());


let ids: string[] = table.getColumn('ID');

let report = {};
let resultFilePath: string = 'lists/result.json';
let results = fs.existsSync(resultFilePath) ? JSON.parse(fs.readFileSync(resultFilePath, 'utf8')) : {};

let keys = Object.keys(results);


function flush(results) {
    fs.writeFileSync(resultFilePath, JSON.stringify(results, null, 4));
}


while (ids.length != Object.keys(results).length) {

}
for (let id of ids) {
    if (keys.indexOf(id) < 0) {
        setTimeout(() => {
            try {
                let sensorUrl = 'https://cdec.water.ca.gov/cgi-progs/querySHEF?station_id=' + id;
                let res = request('GET', sensorUrl);
                let sensorTable = parse(res.getBody());
                results[id] = sensorTable.rows;
                console.log(id);
            } catch (e) {
                console.log(e);
                flush(results)
            }
        }, 1000);
    }
}



