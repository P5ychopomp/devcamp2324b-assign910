import { expect, it } from 'vitest';
import { _passwordLength } from '../routes/signup/+page.server.js';

it('7) [5 PTS] Minimum Password Length', async () => {
	const result = JSON.stringify(_passwordLength('1'));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});
