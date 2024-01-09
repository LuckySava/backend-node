import dbMsql from '../../config/db.js';
import emailValidator from '../../utils/email-validator.js'

// додати експрес роути

// всі методи на паблік


// const sevice = New Service();


// ADD ROUTES

export class UserController {
    createUser = async (req, res, next) => {
        const { email, name } = req.body;

        // const newUser = await sevice.createUser({email, name})

        res.status(201).json({
            ok: 1,
            status: 201,
            message: "User has been created successfully",
            user: newUser,
        });






        try {

            if (emailValidator(email) && name.length >= 2) {

                const [result] = await dbMsql.execute(
                    "INSERT INTO Users (email, name) VALUES ?",
                    [email, name]
                );

                res.status(201).json({
                    ok: 1,
                    status: 201,
                    message: "User has been created successfully",
                    post_id: result.insertId,
                });

            } else {
                res.send('something went wrong, check request body')
            }

        } catch (error) {
            console.log('createUser', error);
            next(error)
        }
    }
}