const express = require('express');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client = redis.createClient('redis://redis-app');
const app = express();

app.use(session({
    store: new redisStore({
        host: 'locahost',
        port: 6379,
        client: client,
    }),
    secret: "keyboard_cat",
}));
var count = 0;
app.get('/', (req, res) => {
    client.set('count', count++);
    return res.send('Added! ' + client.get('count', (err, res) => {
        console.log(res);
    }));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})