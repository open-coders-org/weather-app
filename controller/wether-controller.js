let axios = require('axios')


class Weather{

    constructor(url,appid){
        this._url = url
        this._appid = appid
    }

    get_wather(city,units){

    return new Promise ((resolve,reject) => {
        axios.get(this._url,{
            params: {
                q: city,
                appid : this._appid,
                units : units
            }
        })
        .then(result => resolve(result))
        .catch(err => {
            
            reject(err)
            
        })
    })
     
    }
}

module.exports = {
    Weather
}