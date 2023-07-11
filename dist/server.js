import express from 'express';
import { deleteItem, getItem, postItem, updateItem } from './dynamodbService.js';
const app = express();
app.use(express.json());
const port = 7878;
app.get('/api/main/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const response = await getItem(itemId);
        res.send(response);
    }
    catch (error) {
        res.status(500).send('Error getting information');
    }
});
app.post('/api/main', async (req, res) => {
    try {
        await postItem(req.body);
        res.send(req.body);
    }
    catch (error) {
        res.status(500).send('Error posting information');
    }
});
app.put('/api/main/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        await updateItem(itemId, req.body);
        res.send(req.body);
    }
    catch (error) {
        res.status(500).send('Error updating information');
    }
});
app.delete('/api/main/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const response = await deleteItem(itemId);
        res.send(req.body);
    }
    catch (error) {
        res.status(500).send('Error deleting information');
    }
});
app.listen(port, () => {
    console.log(`Server is running in port ${port}`);
});
//# sourceMappingURL=server.js.map