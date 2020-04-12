const bcrypt = require('bcrypt')
const {db}= require('../data-base/database')

let login = async(username,password) => {

    try{
        let result_db = await db.query('SELECT pass from user where username = ?',[username])
        if (result_db[0].length === 0 ) return false

        
        let {pass} = result_db[0][0]
        
        
        if (!pass) return false
        const result = await bcrypt.compare(password,pass)
        return result
        
        
    }catch(err){
        console.log(err);
        return err
        
    }

}


module.exports= {
    login
}