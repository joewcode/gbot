import 'dotenv/config'
import { Sequelize } from 'sequelize'
import fs from 'fs'; 

const sequelize = new Sequelize(process.env.SQL_BASE, process.env.SQL_USER, process.env.SQL_PASS, {
  host: process.env.SQL_HOST,
  port: process.env.SQL_PORT,
  dialect: 'postgres', /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync('./app/ca.pem').toString()
    }
  }
})

export default sequelize
