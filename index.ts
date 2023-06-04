import { spawn, spawnSync, exec } from 'child_process';
import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import express from 'express';

const app = express();
app.use(express.json());

// const testcode = `
// test('add function should correctly add two numbers', () => {
//   const result = add(2, 3);
//   expect(result).toBe(5);
// });`;

app.post('/execute', async (req, res) => {
	const { code, testcode } = req.body as { code: string; testcode: string };
	const tempFile = `${uuid()}.test.js`;
	await fs.writeFile(tempFile, code + '\n\n' + testcode);
	let output = '';
	const child = exec(`npx jest ${tempFile} - --json --no-cache`);
	if (!child.stdout) {
		return res.json({ error: 'Something went wrong' });
	}

	child.stdout.on('data', (data) => {
		console.log(data);
		output += data.toString();
	});

	child.on('error', (error) => {
		console.error({ error });
		res.status(500).json({ error: 'An error occured during execution' });
	});

	child.on('close', async (code) => {
		console.log(`child process exited with exit code ${code}`);

		await fs.unlink(tempFile);
		console.log(output);
		const results = JSON.parse(output);

		console.log({ results });
		if (results.numFailedTests === 0) {
			return res.json({ success: true, testResults: results });
		} else {
			return res.json({ success: false, testResults: results });
		}
	});
});

app.listen(3000, () => {
	console.log('express application running on 3000');
});
