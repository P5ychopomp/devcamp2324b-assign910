import { expect, it } from 'vitest';
import { seed_user } from '../lib/auth/seed.js';
import { config } from 'dotenv';

config();

it('4) [10 PTS] Hardcoded User Password', async () => {
	const password = process.env.PASSWORD;
	console.log(seed_user);
	expect(password).toBe('iWryXeat9EQmB/zvKhd/5g==');
});