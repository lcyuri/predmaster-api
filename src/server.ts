import express from 'express';
import userController from './controllers/userController.js';
import previsionController from './controllers/previsionController.js';
import { connect, close } from './data/mongo.js';

const app = express();
const port = 8888;

app.use(express.json());
app.use(userController);
app.use(previsionController);

app.listen(port, () => {
  const initApp = async () => {
    try {
      await connect();
      console.log(`Server is running in port ${port}`);
    } catch {
      process.exit(1);
    }
  }

  initApp();
});

process.on('SIGINT', () => {
  const closeApp = async () => {
    try {
      await close();
      process.exit();
    } catch {
      process.exit(1);
    }
  }

  closeApp();
});