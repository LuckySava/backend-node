import express from 'express';
import mysql from './config/db.js';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>')
})

app.post('/v1/user', (req, res) => {

    console.log(req.body)

    const { email, name } = req.body;

    if (email && name) {
        const sql = "INSERT INTO Users (email, name) VALUES ?";
        const data = [
            [email, name]
        ]
        mysql.query(sql, [data], (err, result) => {
            if (err) throw err;
            console.log("user was added", result);
            return;
        })
    }

    res.send('new user was addded')
})

app.listen(5000, () => {
    console.log('sever running at 5000 Port')
})
