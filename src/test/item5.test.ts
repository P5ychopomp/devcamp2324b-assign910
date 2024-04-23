import { expect, it } from 'vitest';
import { _usernameRequired } from '../routes/signup/+page.server.js';

it('5) [5 PTS] Username Requirement', async () => {
	const result = JSON.stringify(_usernameRequired(false));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});