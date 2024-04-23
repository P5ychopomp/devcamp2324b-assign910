import { expect, it } from 'vitest';
import { _passwordRequired } from '../routes/signup/+page.server.js';

it('6) [5 PTS] Password Requirement', async () => {
	const result = JSON.stringify(_passwordRequired(false));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});