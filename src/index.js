require('dotenv').config()
const app = require('./app')
const sequelize = require('./database/database')
const port = process.env.PORT || 4000

async function main() {
    try{
        await sequelize.sync()
        app.listen(port)
        console.log('Server on port', port)
    }catch (err){
        console.log("Database connection error!", err)
    }
}

main()