import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

const users = [];
const tweets = [];

app.post('/sign-up', (req, res) => {
    if(req.body.username === "" || req.body.avatar === ""){
        res.status(400).send("Todos os campos devem estar preenchidos!");
        return;
    }

    const user = req.body;
    users.push(user);
    console.log(users);
    res.sendStatus(201);
});

app.post('/tweets', (req, res) => {
    if(req.body.tweet === ""){
        res.status(400).send('O campo tweet não pode ser vazio!');
        return;
    }

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