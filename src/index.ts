import app from "./app";
import ConnectToPostgres from "./services/database.postgress";
import { APPLICATION_PORT } from "./helpers/constants";

const startServer = async () => {
  await ConnectToPostgres();
  app.listen(APPLICATION_PORT, () =>
    console.info(`Server running on port ${APPLICATION_PORT}!`)
  );
};

startServer();
