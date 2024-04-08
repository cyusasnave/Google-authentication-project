import db from "../database/config/config";

const ConnectToPostgres = async () => {
  try {
    await db.authenticate();
    await db.sync();
    console.log("Connected to postgres successfully!");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default ConnectToPostgres;
