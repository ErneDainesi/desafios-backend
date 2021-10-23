import express, {Application, Request, Response} from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import loginController from './routes/login.route'
import UserSchema, { User } from './models/User';
import MongoStore from 'connect-mongo';
import { COOKIE_MAX_AGE, MONGO_URL, PORT } from './constants';
import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { MongoDatabase } from './db/MongoDatabase';

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

MongoDatabase.connect();

passport.use(new FacebookStrategy({
    clientID: "4327431854042514",
    clientSecret: "3cd04537b7220ae5a4d101f955bbdc8e",
    callbackURL: "login/facebook/callback",
}, (accessToken, refreshToken, profile, done) => {
    UserSchema.find({id: profile.id}, (err: any, user: User) => {
        if (err) return done(err);
        done(null, user);
    });
}
));

passport.serializeUser((user, done) => {
    done(null, (user as User).username);
});

passport.deserializeUser((username: string, done) => {
    console.log()
    UserSchema.find({username: username}, (err: any, user: User) => {
        done(err, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

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
    res.redirect('/login/facebook');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
