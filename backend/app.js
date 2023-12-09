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

});

app.put('/v1/user/:id', (req, res) => {
    const id = req.params.id;
    const { email, name } = req.body;

    if (id || id === 0) {
        const sql = "UPDATE Users SET email = ?, name = ? WHERE id = ?";
        const data = [email, name, id]

        mysql.query(sql, data, (err, result) => {
            console.log(result)
        })
        res.send('put request was successful')
    } else {
        res.send('something went wrong')
    }
})

app.get('/v1/user/:id', (req, res) => {
    const id = req.params.id;

    if (id || id === 0) {
        const sql = `SELECT * FROM Users WHERE id = ${id}`;

        mysql.query(sql, (err, result) => {
            console.log(result)
        })
        res.send('get by id request was successful')
    } else {
        res.send('something went wrong')
    }
});

app.delete('/v1/user/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM Users WHERE id = ${id}`;

    mysql.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        console.log("deleted user with id: ", id);
        res.send('delete by id request was successful')
    })
})

app.listen(5000, () => {
    console.log('server running at 5000 Port')
})
