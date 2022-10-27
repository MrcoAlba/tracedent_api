const { Sequelize } = require('sequelize')

class Database {
    constructor(){
        if (typeof Database.instance === 'object'){
            return Database.instance
        }
        Database.instance = this;
        return this;
    }
    
    connect = function () {
        return sequelize = new Sequelize(
            process.env.DATABASE_URL,{
                dialectOptions: {
                    ssl: {
                        rejectUnauthorized: false,
                    }
                }
            }.sync()
        )
    }
    
}


module.exports = Database