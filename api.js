import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors());

const users = [];
//const tweets = [];
/*const tweets = [
    { username: 'mat', tweet: 'lucaslucas', avatar: 'ewdkemwd' },
    { username: 'mat', tweet: 'lucadkojweoslucas', avatar: 'ewdkemwd' },
    { username: 'mat', tweet: 'd', avatar: 'ewdkemwd' },
    { username: 'lucas', tweet: 'de2don', avatar: 'ewdkemwd' },
    { username: 'lucas', tweet: 'matmat', avatar: 'ewdkemwd' },
    { username: 'lucas', tweet: 'matsfdkskdflmat', avatar: 'ewdkemwd' }
];*/

const tweets = Array.from({ length: 23 }, (_, index) => ({
    username: `user${index + 1}`,
    tweet: `tweet${index + 1}`,
    avatar: `avatar${index + 1}`
  }));

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

    const postUser = users.find((user) => user.username === req.headers.user);
    const tweet = {tweet: req.body.tweet, username: req.headers.user, avatar: postUser.avatar};
    tweets.push(tweet);
    console.log(tweets);
    res.sendStatus(201);
});

app.get('/tweets/:username', (req, res) => {
    const tweetsFilter = tweets.filter((tweet) => tweet.username === req.params.username);
    console.log(tweetsFilter);
    res.send(tweetsFilter);
});


app.get('/tweets', (req, res) => {
    if(!req.query.page || parseInt(req.query.page) < 1){
        res.status(400).send('Informe uma página válida!');
        return;
    }

    console.log(tweets);

    const currentPage = parseInt(req.query.page);
    const pageLength = 10;
    
    const last = tweets.length - (currentPage-1)*pageLength < 0 ? 0 : tweets.length - (currentPage-1)*pageLength;
    const first = last - pageLength < 0 ? 0 : last - pageLength;

    console.log(first);
    console.log(last);

    res.send(tweets.slice(first,last).reverse());
});

app.listen(5001);