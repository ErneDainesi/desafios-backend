import {User} from './models/User';
import {getServerPort} from './lib/stdinParser';
import {MongoDatabase} from './db/MongoDatabase';
import cluster from 'cluster';
import {cpus} from 'os';
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

// cluster.isMaster is deprecated https://nodejs.org/api/cluster.html#clusterismaster
if (cluster.isPrimary) {
	for (let i = 0; i < cpus.length; i++) {
		cluster.fork();
	}

	cluster.on('exit', (worker, code, signal) => {
		if (signal) {
			console.log(`worker was killed by signal: ${signal}`);
		} else if (code !== 0) {
			console.log(`worker exited with error code: ${code}`);
		} else {
			console.log(`worker ${worker.process.pid} died`);
		}
	})
} else {
	app.listen(port, () => {
		console.log(`Listening on port: ${port}`);
		console.log(`worker ${process.pid} started`);
	});
}



