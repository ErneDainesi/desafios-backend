import express, {Application, Request, Response} from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import loginController from './routes/login.route'
import { User } from './users';
import MongoStore from 'connect-mongo';

const app: Application = express();
const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    store: MongoStore.create({mongoUrl: "mongodb+srv://ernesto:erne@cluster0.mf9ug.mongodb.net/ecommerce?retryWrites=true&w=majority"}),
    secret: 'secreto',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}));

// Con esto puedo extender session
declare module 'express-session' {
    interface SessionData {
        user: User,
        creationTime: number
    }
}
app.use('/login', loginController);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);

app.get('/', (req: Request, res: Response) => {
    res.redirect('/login');
});

app.listen(8080, () => {
    console.log('Ready');
});
