import express, {Application, Request, Response} from 'express';
import { ConnectionToDatabase } from './database/Connection';
import messagesController from './routes/messagesRoute';
import mockApi from './mock_api/routes/products.route';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/messages', messagesController);
app.use('/mock', mockApi);

app.get('/', (req: Request, res: Response) => {
    res.json({message: "Desafio 22"});
})

ConnectionToDatabase();

app.listen(8080, () => console.log("Server on Port 8080"));