

const dbOptions = {
  "development": {
    "username": "root",
    "password": "password",
    "database": "maltshop",
    "host": "127.0.0.1",
    "port": 3306,
    "dialect": "mysql"
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}

export default dbOptions;
