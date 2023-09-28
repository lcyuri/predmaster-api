import express from 'express';
import userController from './controllers/userController.js';
import previsionController from './controllers/previsionController.js';
import historyController from './controllers/historyController.js';
import settingsController from './controllers/settingsController.js';
import alarmController from './controllers/alarmController.js';
import { connect, close } from './data/mongo.js';

const server = express();
const port = 8888;

server.use(express.json());
server.use(userController);
server.use(previsionController);
server.use(historyController);
server.use(settingsController);
server.use(alarmController);

server.listen(port, () => {
  const initServer = async () => {
    try {
      await connect();
      console.log(`Server is running in port ${port}`);
    } catch {
      process.exit(1);
    }
  }

  initServer();
});

process.on('SIGINT', () => {
  const closeServer = async () => {
    try {
      await close();
      process.exit();
    } catch {
      process.exit(1);
    }
  }

  closeServer();
});