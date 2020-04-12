const {db} = require('../data-base/database')
const bcrypt = require('bcrypt')

let create_user = async (username, password) => {

    bcrypt.hash(password.toString(), 10, async (err, hash) => {

        if (err) 
            return console.log(err);
        

        try {

            let result = await db.query("INSERT INTO user (username,pass) values(?,?)", [username, hash])
            console.log(result);

        } catch (err) {

            if (err.sqlState == 23000) {
                return console.log('El usuario ya existe');

            } else {
                return console.log('error con la base de datos');

            }


        } finally {
            process.exit(0)
        }

    })


}


module.exports = {
    create_user
}
