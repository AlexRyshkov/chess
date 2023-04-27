import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("gameState", (tableBuilder) => {
    tableBuilder.string("session_id").primary();
    tableBuilder.json("data");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("gameState");
}
