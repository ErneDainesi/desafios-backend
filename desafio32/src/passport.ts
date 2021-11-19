import passport from 'passport';
import {Strategy as FacebookStrategy} from 'passport-facebook';
import {getFacebookClientId, getFacebookClientSecret, getServerPort} from './lib/stdinParser';
import UserSchema, {User} from './models/User';

passport.use(new FacebookStrategy({
	clientID: getFacebookClientId(),
	clientSecret: getFacebookClientSecret(),
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

export default passport;

