import {User} from './models/User';
import {getServerMode, getServerPort} from './lib/stdinParser';
import {MongoDatabase} from './db/MongoDatabase';
import cluster from 'cluster';
import {cpus} from 'os';
import app from './app';
import logger from './logger/winston';

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
				logger.warn(`worker was killed by signal: ${signal}`);
			} else if (code !== 0) {
				logger.error(`worker exited with error code: ${code}`);
			} else {
				logger.warn(`worker ${worker.process.pid} died`);
			}
		})
	} else {
		app.listen(port, () => {
			logger.info(`[CLUSTER] Listening on port: ${port}`);
			logger.info(`worker ${process.pid} started`);
		});
	}
}

if (getServerMode()) {
	initClusterMode();
} else {
	app.listen(port, () => {
		logger.info(`[FORK] Listening on port: ${port}`);
	});
}

