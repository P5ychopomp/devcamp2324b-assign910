import { expect, it } from 'vitest';
import { attemptCounter } from '$lib/auth/cookie.js';

it('11) [30 PTS] Too Many Login Attempts', async () => {
	for (let i = 0; i < 5; i++) {
		if (i === 4) expect(() => attemptCounter(false)).toThrowError();
		expectTypeOf(attemptCounter(false)).toBeObject();
	}
});