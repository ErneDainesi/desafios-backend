import {User} from './models/User';
import {getServerPort} from './lib/stdinParser';
import {MongoDatabase} from './db/MongoDatabase';
import app from './app';

// Con esto puedo extender session
declare module 'express-session' {
	interface SessionData {
		user: User,
		creationTime: number
	}
}

MongoDatabase.connect();
const port = getServerPort();
app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

