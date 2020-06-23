import express from 'express';
import routes from './routes/routes';

const app = express();

const PORT = 3333;

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
    console.log(`Server started on port ${PORT}`);
});
