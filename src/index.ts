import app from "./app";
import ConnectToPostgres from "./services/database.postgress";

const APPLICATION_PORT = process.env.PORT;

const startServer = async () => {
    await ConnectToPostgres();
    app.listen(APPLICATION_PORT, () => console.info(`Server running on port ${APPLICATION_PORT}!`))
}

startServer();