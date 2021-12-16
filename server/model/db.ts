import { Client } from 'pg';

const client = new Client({
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
  .catch((err: any) => console.log(err));

export default client;