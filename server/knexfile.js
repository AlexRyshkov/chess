const path = require("path");

const config = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'db',
      database: 'postgres',
      user:     'postgres',
      password: '123'
    },
    migrations: {
      tableName: "knex_migrations",
      directory:  path.resolve(__dirname, 'src', 'migrations')
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory:  path.resolve(__dirname, 'src', 'migrations')
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations",
      directory:  path.resolve(__dirname, 'src', 'migrations')
    }
  }
};

module.exports = config;
