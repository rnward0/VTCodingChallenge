"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    user: 'smarthomesdashboarduser@smarthomes',
    host: 'smarthomes.postgres.database.azure.com',
    database: 'wattage',
    password: 'b5zT;q_fS\\aAUtpD',
    ssl: true
});
client.connect()
    .then(() => {
    console.log("Connected to postgres!");
})
    .catch((err) => console.log(err));
exports.default = client;
