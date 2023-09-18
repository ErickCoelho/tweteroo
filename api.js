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
    console.log(users);
    res.sendStatus(201);
});

app.post('/tweets', (req, res) => {
    const postUser = users.find((users) => users.username === req.body.username);
    const tweet = {...req.body, avatar: postUser.avatar};
    tweets.push(tweet);
    console.log(tweets);
    //res.send("OK");
    res.sendStatus(201);
});

app.get('/tweets', (req, res) => {
    console.log(tweets);
    res.send(tweets.slice(-10));
});

app.listen(5001);