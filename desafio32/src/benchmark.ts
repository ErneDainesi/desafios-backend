import autocannon, {Instance} from 'autocannon';
import {PassThrough} from 'stream';

const run = (url: string) => {
	const buf = [];
	const outputStream = new PassThrough();
	const inst = autocannon({
		url,
		connections: 100,
		duration: 20
	});
	autocannon.track(inst, {outputStream});
	outputStream.on('data', data => buf.push(data));
	inst.on('done', () => {
		process.stdout.write(Buffer.concat(buf));
	});
}

