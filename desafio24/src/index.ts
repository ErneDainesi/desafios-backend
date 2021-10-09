import express, {Application, Request, Response} from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import loginController from './routes/login.route'
import { User } from './users';
import { checkForInactivity } from './middlewares/login.middlewares';

const app: Application = express();
const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: 'secreto',
    resave: true,
    saveUninitialized: true
}));
//app.use(checkForInactivity);

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
