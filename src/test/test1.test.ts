import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import { config } from 'dotenv';
import '@testing-library/jest-dom';
import { expect, it, vi } from 'vitest';
import { handleError } from '../hooks.server.ts';
import Dashboard from '../routes/(authenticated)/dashboard/+page.svelte';
import { seed_user } from '../lib/auth/seed.js';
import {
	_usernameRequired,
	_passwordRequired,
	_passwordLength,
	_passwordMatch,
	_passwordComplexity,
	_userExists
} from '../routes/signup/+page.server.js';
import { attemptCounter } from '$lib/auth/cookie.js';
import { err } from 'neverthrow';
import Header from '../routes/Header.svelte';

config();

it('1) [10 PTS] Error Hook', async () => {
	const fn = await handleError();
	expect(fn).toStrictEqual({
		message: 'Kaboom!'
	});
});

it('2) [10 PTS] Fast Page Navigation', async () => {
	const data = {
		results: [
			{ id: 1, name: 'dummy' },
			{ id: 2, name: 'dummy' }
		]
	};
	await render(Dashboard, { props: { data } });

	expect(screen.getByRole('link', { name: 'Data' })).toHaveAttribute('data-sveltekit-preload-data');
});

it('3) [10 PTS] Reloading', async () => {
	const data = {
		results: [
			{ id: 1, name: 'dummy' },
			{ id: 2, name: 'dummy' }
		]
	};
	await render(Dashboard, { props: { data } });

	expect(screen.getByRole('link', { name: 'Log Out' })).toHaveAttribute('data-sveltekit-reload');
});

it('4) [10 PTS] Hardcoded User Password', async () => {
	const password = process.env.PASSWORD;
	console.log(seed_user);
	expect(password).toBe('iWryXeat9EQmB/zvKhd/5g==');
});

it('5) [5 PTS] Username Requirement', async () => {
	const result = JSON.stringify(_usernameRequired(false));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});

it('6) [5 PTS] Password Requirement', async () => {
	const result = JSON.stringify(_passwordRequired(false));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});

it('7) [5 PTS] Minimum Password Length', async () => {
	const result = JSON.stringify(_passwordLength('1'));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});

it('8) [5 PTS] Password Matching', async () => {
	const result = JSON.stringify(_passwordMatch('2', '5'));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});

it('9) [5 PTS] Password Complexity', async () => {
	const result = JSON.stringify(_passwordComplexity(false, false, false));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});

it('10) [5 PTS] User Already Exists', async () => {
	const result = JSON.stringify(await _userExists('upcsi'));
	const resultJson = JSON.parse(result);
	console.log(resultJson);
	expect(resultJson.status).toBe(422);
	expect(resultJson.data.error).toBeDefined();
});

it('11) [30 PTS] Too Many Login Attempts', async () => {
	for (let i = 0; i < 5; i++) {
		if (i === 4) expect(() => attemptCounter(false)).toThrowError();
		expectTypeOf(attemptCounter(false)).toBeObject();
	}
});

it('BONUS) [10 PTS] hAcKEr_kAbA', async () => {
	await render(Header);
  expect(screen.getByRole('link', { name: 'imissher' }));
});
