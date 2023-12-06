import express from 'express';
import mysql from './config/db.js';
import bodyParser from 'body-parser';
import emailValidator from './utils/email-validator.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('<h1>Home</h1>')
})

app.post('/v1/user', (req, res) => {

    const { email, name } = req.body;

    if (emailValidator(email) && name.length >= 2) {
        const sql = "INSERT INTO Users (email, name) VALUES ?";
        const data = [
            [email, name]
        ]

        mysql.query(sql, [data], (err, result) => {
            if (err) throw err;
            console.log("user was added", result);
        })

        res.send('new user was added')
    } else {
        res.send('something went wrong, check request body')
    }

})

app.listen(5000, () => {
    console.log('sever running at 5000 Port')
})
