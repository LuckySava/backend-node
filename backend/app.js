import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('<h1>Start coding</h1>')
})

app.listen(5000, () => {
    console.log('sever running at 5000 Port')
})