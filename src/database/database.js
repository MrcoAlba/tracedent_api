const { Sequelize } = require('sequelize')

console.log("temporal")
console.log(process.env.HOST)
console.log(process.env.USER)
console.log(process.env.PASSWORD)
console.log(process.env.DATABASE)
console.log(process.env.PORT)
console.log("temporal")

console.log("antes")
/*const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.USER, 
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'postgres'
})*/
try{
    const sequelize = new Sequelize(process.env.URI)
}catch(error){
    console.log("ERROROROROR->",error)
}

console.log("despues")

module.exports = sequelize