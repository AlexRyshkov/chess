import type { Knex } from "knex";
import path from "path";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: {
      host: "db",
      database: "postgres",
      user: "postgres",
      password: "123",
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "src", "migrations"),
    },
  },
};

export default config;
