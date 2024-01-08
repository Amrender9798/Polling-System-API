import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'
import connectDB from './dbconfig.js';
import questionRouter from './routes/question.routes.js';
import optionRouter from './routes/options.route.js';

const app = express();
const port = 8000;


app.use(bodyParser.json());

app.get('/', (req, res) => {
    const indexPath = path.join(process.cwd(),'index.html');
    res.sendFile(indexPath);
});

app.use('/questions',questionRouter);
app.use('/options',optionRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});
