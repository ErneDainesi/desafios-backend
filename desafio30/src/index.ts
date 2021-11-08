import {User} from './models/User';
import {getServerMode, getServerPort} from './lib/stdinParser';
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
const numCpus = cpus().length;

// cluster.isMaster is deprecated https://nodejs.org/api/cluster.html#clusterismaster
const initClusterMode = () => {
	if (cluster.isPrimary) {
		for (let i = 0; i < numCpus; i++) {
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
			console.log(`[CLUSTER] Listening on port: ${port}`);
			console.log(`worker ${process.pid} started`);
		});
	}
}

if (getServerMode()) {
	initClusterMode();
} else {
	app.listen(port, () => {
		console.log(`[FORK] Listening on port: ${port}`);
	});
}

