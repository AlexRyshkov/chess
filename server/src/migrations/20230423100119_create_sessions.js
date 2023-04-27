/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("sessions", (tableBuilder) => {
    tableBuilder.string("id").primary();
    tableBuilder
      .enum("status", ["waitingForPlayer", "inGame", "finished"])
      .notNullable()
      .defaultTo("waitingForPlayer");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("sessions");
};
