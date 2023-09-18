import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    const user = req.body;
    users.push(user);
    res.sendStatus(201);
});

app.post('/tweets', (req, res) => {
    const tweet = req.body;
    tweets.push(tweet);
    //res.send("OK");
    res.sendStatus(201);
});

app.get('/tweets', (req, res) => {
    res.send(tweets.slice(-10));
});

app.listen(5001);