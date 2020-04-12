let minimist = require('minimist')
let cTable = require('console.table')
let {conf} = require ('./conf/conf')
let {Weather} = require('./controller/wether-controller')
let {create_user} = require('./controller/user-controller')
let {cli} = require('cli-ux')
let {login} = require('./auth/auth')


let argv = minimist(process.argv.slice(2))

let {url,appid} = conf
let {city, units} = argv


async function main() {
    let weather = new Weather(url, appid)
    let {create, username, pass } = argv
    if (create && username &&  pass)  create_user(username,pass)
    

    let user = await cli.prompt('username')
    let password = await cli.prompt('password',{type: 'hide'})

    let login_response = await login(user,password)
  
     
    if ( !login_response){
        console.log('usuario o contraseña no coinciden');
        process.exit(0)
    }
    
    try {
        let data = await weather.get_wather(city, units)
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

        const table2 = cTable.getTable([
            data
        ])
        console.log(table2);
        }
    process.exit(0)
}

main()

