import winston, {Logger} from "winston";

const logger: Logger = winston.createLogger({
	level: 'warn',
	transports: [
		new winston.transports.Console({level: 'verbose'}),
		new winston.transports.File({filename: 'error.log', level: 'error'}),
		new winston.transports.File({filename: 'warn.log', level: 'warn'})
	]
})

export default logger;

