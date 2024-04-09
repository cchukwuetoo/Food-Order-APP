import express from 'express';
import App from './services/ExpressApp';
import dbConnection from './services/Database';
import { PORT } from './config'; 

const StartServer = async () => {
    const app = express()

     await dbConnection()

     await App(app);

     app.listen( PORT, () => {
        console.log(`Listening to port ${PORT}`);

     });

}

StartServer();

HRKU-97629bdb-80fe-4e9c-8bf5-c758bb16d8bf