const Sequelize = require("sequelize");

const sequelise_instance = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD,
    {
        host: process.env.MYSQLHOST,
        port: process.env.MYSQLPORT,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    })


const database = {};

database.Sequelize = Sequelize;
database.sequelise_instance = sequelise_instance;


const patient_module = require("./models/patient_model");


database.Patient = patient_module(sequelise_instance,Sequelize);


module.exports = database;