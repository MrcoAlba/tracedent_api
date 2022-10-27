require('dotenv').config()
const app = require('./app')
const Database = require('./database/database')
const database = new Database()
const port = process.env.PORT || 4000



async function main() {
    try{
        await database.connect()
        app.listen(port)
        console.log('Server on port', port)
    }catch (err){
        console.log("DATABASE CONNECTION ERROR!", err)
    }
}

main()