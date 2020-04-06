let minimist = require('minimist')
let cTable = require('console.table')
let {conf} = require ('./conf/conf')
let {Weather} = require('./controller/wether-controller')

let argv = minimist(process.argv.slice(2))

let {url,appid} = conf
let {city, units} = argv


async function main() {
    let weather = new Weather(url, appid)

    try {
        let data = await weather.get_wather(city, units)
        // console.log(data);


        let {temp, temp_min, temp_max, humidity} = data.data.main
        let {country} = data.data.sys

        let temperature = {
            temp,
            temp_min,
            temp_max,
            humidity,
            country
        }

        const table = cTable.getTable([
            temperature
        ])

        console.log(table);
        
    } catch (error) {
        let {response:{data}} = error
        //console.log(data);

        const table2 = cTable.getTable([
            data
        ])
        console.log(table2);
        
        
        
        

    }
}

main()
