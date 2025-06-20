const {Pool} = require("pg")
require("dotenv").config()

const requiredEnvVars = ["PGHOST", "PGUSER", "PGDATABASE", "PGPASSWORD", "PGPORT"]

requiredEnvVars.forEach(key => {
    if(!process.env[key]){
        throw new Error(`Missing required environmental variable: ${key}`)
    }
})

const config = {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT
}

const pool = new Pool(config)

module.exports = {pool}