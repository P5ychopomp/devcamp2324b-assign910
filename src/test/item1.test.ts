import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import { handleError } from '../hooks.server.ts';

it('1) [10 PTS] Error Hook', async () => {
	const fn = await handleError();
	expect(fn).toStrictEqual({
		message: 'Kaboom!'
	});
});