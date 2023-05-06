import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("sessions", (tableBuilder) => {
    tableBuilder.string("id").primary();
    tableBuilder
      .enum("status", ["waitingForPlayer", "inGame", "finished"])
      .notNullable()
      .defaultTo("waitingForPlayer");
    tableBuilder.string("accessToken").notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("sessions");
}
