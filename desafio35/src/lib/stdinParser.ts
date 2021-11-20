import {
	FB_CLIENT_ID,
	FB_CLIENT_SECRET,
	PORT,
	FB_CLIENT_ID_INDEX,
	FB_CLIENT_SECRET_INDEX,
	PORT_INDEX,
	SERVER_MODE_INDEX,
	CLUSTER_MODE
} from '../constants';

export const getServerPort = () => {
	return process.argv[PORT_INDEX] ? process.argv[PORT_INDEX] : PORT;
}

export const getFacebookClientId = () => {
	return process.argv[FB_CLIENT_ID_INDEX] ? process.argv[FB_CLIENT_ID_INDEX] : FB_CLIENT_ID;
}

export const getFacebookClientSecret = () => {
	return process.argv[FB_CLIENT_SECRET_INDEX] ? process.argv[FB_CLIENT_SECRET_INDEX] : FB_CLIENT_SECRET;
}

export const serverAsClusterMode = () => {
	return process.argv[SERVER_MODE_INDEX] === CLUSTER_MODE;
}

