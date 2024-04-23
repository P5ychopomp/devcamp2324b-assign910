import { expect, it } from 'vitest';
import { _passwordMatch } from '../routes/signup/+page.server.js';

it('8) [5 PTS] Password Matching', async () => {
	const result = JSON.stringify(_passwordMatch('2', '5'));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});