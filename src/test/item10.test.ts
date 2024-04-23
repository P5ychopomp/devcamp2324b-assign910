import { expect, it } from 'vitest';
import { _userExists } from '../routes/signup/+page.server.js';

it('10) [5 PTS] User Already Exists', async () => {
	const result = JSON.stringify(await _userExists('upcsi'));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});