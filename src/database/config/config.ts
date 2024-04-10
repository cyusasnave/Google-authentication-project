import { Sequelize } from "sequelize";
import { DB_NAME, DB_USER, DB_PASS } from "../../helpers/constants";

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: "localhost",
  dialect: "postgres",
});

export default db;
