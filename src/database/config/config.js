// require('dotenv').config(); //Es necesaria esta linea ???
module.exports = {
  "development": {
    "username": process.env.USER,
    "password": null,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.USER,
    "password": null,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env.USER,
    "password": null,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
