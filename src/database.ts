import { createConnection } from "typeorm";
const dbConnection = createConnection("AppConnection").then((connection) => {
  
  connection.query("CREATE DATABASE IF NOT EXISTS app");
});
export default dbConnection;
