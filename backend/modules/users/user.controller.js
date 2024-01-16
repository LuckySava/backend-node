import mysql from '../../config/db.js';
import emailValidator from '../../utils/email-validator.js';
import {UserDataAccesLayer} from './user.repository.js'

const userData = new UserDataAccesLayer();

console.log(userData)

export const createUser = (req, res) => {
    const { email, name } = req.body;
    console.log({ email, name });
    
    // const userCreatedData = await userData.createUser(userData)

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
}

export const updateUser = (req, res) => {
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
}

export const getUser = (req, res) => {
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
}

export const deleteUser = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM Users WHERE id = ${id}`;

    mysql.query(sql, (err, result) => {
        if (err) {
            console.log("error: ", err);
        }
        console.log("deleted user with id: ", id);
        res.send('delete by id request was successful')
    })
}
