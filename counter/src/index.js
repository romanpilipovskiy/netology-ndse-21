const express = require('express');
const redis = require('redis');

const PORT = process.env.PORT || 8081;
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost';

const app = express();
const client = redis.createClient({ url: REDIS_URL });    

(async () => {
    await client.connect();
})();

app.post('/counter/:bookId/incr', async (req, res) => {
    const {bookId} = req.params;

    let count = await client.incr(bookId);
    
    res.json({id: bookId, count: count});
});

app.get('/counter/:bookId', async (req, res) => {
    const {bookId} = req.params;
   
    let count = await client.get(bookId);

    res.json({id: bookId, count: count});
});

app.listen(PORT, () => {
    console.log(`Counter is running on port: ${PORT}`)
});