/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sessions', tableBuilder =>  {
        tableBuilder.string('id').primary();
        tableBuilder.string('access_token').notNullable();
        tableBuilder.enum('status', ['waitingForPlayer', 'inGame', 'Finished']).notNullable().defaultTo(('waitingForPlayer'))
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('sessions');
};
