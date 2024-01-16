import express from 'express';

import bodyParser from 'body-parser';
import userRoute from './modules/users/user.routes.js'
export const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/v1/user', userRoute)

app.listen(5000, () => {
    console.log('server running at 5000 Port')
})
