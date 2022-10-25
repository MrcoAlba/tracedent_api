require('dotenv').config()
const app = require('./app')
const sequelize = require('./database/database')
const port = process.env.PORT || 4000

async function main() {
    try{
        console.log("11111")
        await sequelize.authenticate()
        console.log("22222")
        
        app.listen(port)
        console.log('Server on port', port)
    }catch (err){
        console.log("Database connection error!", err)
    }
}

main()