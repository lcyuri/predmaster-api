import express from 'express';
import { getItem, postItem } from './services/userService.js';
import { v4 as uuidv4 } from 'uuid';
import { User } from './interfaces/user.js';

const app = express();
app.use(express.json());

const port = 7878;

app.get('/api/user/:id', async (req, res) => {
  try {
    const itemId = req.params.id;

    const response = await getItem(itemId);

    res.send(response);
  } catch (error) {
    res.status(500).send('Error getting user');
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const newUser = req.body as User;
    newUser.id = uuidv4();

    await postItem(req.body);

    res.send(req.body);
  } catch (error) {
    res.status(500).send('Error adding new user');
  }
});

app.listen(port, () => {
  console.log(`Server is running in port ${port}`);
})