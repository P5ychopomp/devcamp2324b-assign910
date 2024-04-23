import { expect, it } from 'vitest';
import { _passwordComplexity } from '../routes/signup/+page.server.js';

it('9) [5 PTS] Password Complexity', async () => {
	const result = JSON.stringify(_passwordComplexity(false, false, false));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});