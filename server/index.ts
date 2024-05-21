import './core_settings';
import express from 'express';
import { Accounts } from './modules/accounts';
import { sequelize } from './database';
import bodyParser from 'body-parser';
import { RequestedMigrate } from './tools';
import { Friendship } from './modules/friendship';
import cors from 'cors'
import { Dialog } from './modules/dialogs';
import { Server } from "socket.io";
import { createServer } from 'node:http';

(async () => {
    const app = express()
    const server = createServer(app);
    const io = new Server(server, {
        cors: {
            origin: '*'
        }
    });

    RequestedMigrate(async () => await sequelize.sync())

    app.use(bodyParser.json());
    app.use(cors({ origin: '*'}))

    new Accounts(app);
    new Friendship(app);
    new Dialog(app, io);

    const port = process.env.HTTP_PORT
    server.listen(port)
    io.on('connection', () => {})
    
})()


