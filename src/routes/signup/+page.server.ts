import { auth } from '$lib/auth';
import { AUTH_TOKEN_EXPIRY_SECONDS } from '$lib/constants.server';
import { fail } from '@sveltejs/kit';
import { getUser } from '$lib/db';
import type { Actions } from './$types';

export function _usernameRequired(username) {
	if (!username) return fail(422, { error: 'A username is required.' });
	return;
}

export function _passwordRequired(password) {
	if (!password) return fail(422, { error: 'A password is required.' });
	return;
}

export function _passwordLength(password) {
	if (password.length < 8)
		return fail(422, {
			error: 'Password must be at least 8 characters long.'
		});
	return;
}

export function _passwordMatch(password, password_confirm) {
	if (password !== password_confirm)
		return fail(422, {
			error: 'Your password must match.'
		});
	return;
}

export function _passwordComplexity(containsUppercase, containsNumber, containsSpecialCharacter) {
	if (!containsUppercase && !containsNumber && !containsSpecialCharacter)
		return fail(422, {
			error:
				'Your password must contain at least one special character, one number, and one uppercase letter.'
		});
	return;
}

export async function _userExists(username) {
	if (await getUser(username))
		return fail(422, {
			error: 'User already exists.'
		});
	return;
}

export const actions: Actions = {
	default: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;
		const password_confirm = data.get('password-confirm') as string;
		const containsUppercase = /[A-Z]/.test(password);
		const containsNumber = /[0-9]/.test(password);
		const containsSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
		const userExists = await _userExists(username);
		const usernameRequired = _usernameRequired(username);
		const passwordRequired = _passwordRequired(password);
		const passwordLength = _passwordLength(password);
		const passwordMatch = _passwordMatch(password, password_confirm);
		const passwordComplexity = _passwordComplexity(
			containsUppercase,
			containsNumber,
			containsSpecialCharacter
		);

		if (usernameRequired) return usernameRequired;
		if (userExists) return userExists;
		if (passwordRequired) return passwordRequired;
		if (passwordLength) return passwordLength;
		if (passwordMatch) return passwordMatch;
		if (passwordComplexity) return passwordComplexity;

		const signup_resp = await auth.signup({
			username,
			password,
			password_confirm,
			opts: { cookies: event.cookies }
		});

		if (signup_resp.isErr()) {
			const error = (
				String(signup_resp.error) ?? 'There was an issue creating your account. Please try again.'
			).trim();
			return fail(500, { username, error });
		}

		// Sign the user in immediately
		const login_resp = await auth.login({
			username,
			password,
			opts: { cookies: event.cookies }
		});

		if (login_resp.isErr()) {
			const error = (String(login_resp.error) ?? 'Could not sign you in. Please try again.').trim();
			return fail(500, { username, error });
		}

		const user = login_resp.value;
		console.log(user);
		if (user?.id && user?.token) {
			event.cookies.set('auth_token', `${user.id}:${user.token}`, {
				path: '/',
				maxAge: AUTH_TOKEN_EXPIRY_SECONDS
			});
		}

		delete user.token;

		return { user };
	}
};
