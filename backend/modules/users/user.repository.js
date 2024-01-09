// Data access layer

// Дані нашої апки

// клас який має повернути наприклад інтерфейс юзера....

// повернення дати

// запит в БД

import dbMsql from '../../config/db.js'

export class UserDataAccesLayer {
    createUser = async (useData) => {


        const { email, name } = useData;

        const [result] = await dbMsql.execute(
            "INSERT INTO Users (email, name) VALUES ?",
            [email, name]
        );

        return {
            id,
            name,
            email
        };

    }

    listUsers = async (userParam) => {
        // {email} = userParam
        //                 sql = `SELECT * FROM Users WHERE id=${id}`

        const [row] = await dbMsql.query(sql);
    }

    updateUserById = async (req, res, next) => {
        const id = req.params.id;
        const { email, name } = req.body;

        try {
            const [row] = await dbMsql.query("SELECT * FROM `Users` WHERE `id`=?", [
                id,
            ]);

            if (row.length !== 1) {
                return res.json({
                    ok: 0,
                    statu: 404,
                    message: "Invalid data, cannot update post, Wrong ID",
                });
            }

            await dbMsql.execute(
                "UPDATE `Users` SET `email`=?, `name`=?,`id`=?",
                [email, name, id]
            );
            res.json({
                ok: 1,
                status: 200,
                message: "Post Updated Successfully",
            });

        } catch (error) {
            console.log('updateUserById', error)
            next(error)
        }
    }

    getUser = async (req, res, next) => {
        const id = req.params.id;
        try {
            let sql = "SELECT * FROM `Users`";
            if (id || id === 0) {
                sql = `SELECT * FROM Users WHERE id=${id}`

                const [row] = await dbMsql.query(sql);

                if (row.length === 0 && id) {
                    return res.status(404).json({
                        ok: 0,
                        status: 404,
                        message: "Invalid post ID.",
                    });
                }
            }

            const user = id ? { user: row[0] } : { users: row };
            res.status(200).json({
                ok: 1,
                status: 200,
                ...user
                // додати явні поля
            });

        } catch (error) {
            next(error)
        }
    }

    deleteUserByid = async (req, res, next) => {
        const id = req.body.id
        try {
            const [result] = await DB.execute(
                "DELETE FROM `posts` WHERE `id`=?",
                [id]
            );
            if (result.affectedRows) {
                return res.json({
                    ok: 1,
                    status: 200,
                    message: "Post has been deleted successfully.",
                });
            }

            res.status(404).json({
                ok: 0,
                status: 404,
                message: "Invalid post ID.",
            });
        } catch (error) {
            next(error)
        }
    }
}