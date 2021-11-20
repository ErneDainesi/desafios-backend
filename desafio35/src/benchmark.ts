import autocannon from "autocannon";
import {PassThrough} from 'stream';

const run = (url: string) => {
	const buf = [];
	const outPutStream = new PassThrough();
	const inst = autocannon({
		url,
		connections: 100,
		duration: 20
	});

	autocannon.track(inst, {outputStream});
	outPutStream.on(('data'), data => buf.push(data));
	inst.on('done', () => {
		process.stdout.write(Buffer.concat(buf))
	});
}

run('http://localhost:8080/randoms?amount=1000');
run('http://localhost:8080/info');

