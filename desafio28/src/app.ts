import express, {Application, Request, Response} from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import MongoStore from 'connect-mongo';
import loginController from './routes/login.route'
import infoController from './routes/info.route';
import randomsController from './routes/randoms.route';
import passport from './passport';
import {
	COOKIE_MAX_AGE,
	MONGO_URL,
} from './constants';

const app: Application = express();
const ejs = require("ejs").__express; // solucion a error "cannot find ejs module"

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
	store: MongoStore.create({mongoUrl: MONGO_URL}),
	secret: 'secreto',
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: COOKIE_MAX_AGE
	}
}));


app.use(passport.initialize());
app.use(passport.session());

app.use('/login', loginController);
app.use('/info', infoController);
app.use('/randoms', randomsController);

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.engine('ejs', ejs);

app.get('/', (req: Request, res: Response) => {
	res.redirect('/login/facebook');
});

export default app;

