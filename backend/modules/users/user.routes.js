import express from 'express'
import { createUser, updateUser, getUser, deleteUser } from './user.controller.js'

const userRoute = express.Router()

userRoute.route('/').post(createUser)
userRoute.route('/:id')
    .put(updateUser)
    .get(getUser)
    .delete(deleteUser)


export default userRoute;