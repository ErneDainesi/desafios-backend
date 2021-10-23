import express, {Application, Request, Response} from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import loginController from './routes/login.route'
import UserSchema, { User } from './models/User';
import MongoStore from 'connect-mongo';
import { COOKIE_MAX_AGE, MONGO_URL, PORT } from './constants';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { hashPassword, isValidPassword } from './lib/passwordManagment';
import { MongoDatabase } from './db/MongoDatabase';
import { mongo } from 'mongoose';

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

passport.use('login', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    UserSchema.findOne({username}, (err: any, user: User) => {
        if (err) return done(err);
        if (!user) {
            console.log(`User with username: ${username} was not found`);
            return done(null, false);
        }
        if (!isValidPassword(user, password)) {
            console.log(user.password);
            console.log(password);
            console.log("Invalid password");
            return done(null, false);
        }
        return done(null, user);
    })
}));

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, (req, username, password, done) => {
    UserSchema.findOne({username}, (err: any, user: User) => {
        if (err) return done(err);
        if (user) {
            console.log("User already exists");
            return done(null, false);
        }
        const hashedPassword = hashPassword(req.body.password);
        const newUser = {
            username: req.body.username,
            password: hashedPassword
        };
        const mongoDB: MongoDatabase = new MongoDatabase();
        try {
            mongoDB.insertUser(newUser as User);
            return done(null, newUser);
        } catch (err) {
            console.error(err);
        }
    })
}));

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
    res.redirect('/login');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
