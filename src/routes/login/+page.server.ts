import { auth } from '$lib/auth';
import { AUTH_TOKEN_EXPIRY_SECONDS } from '$lib/constants.server';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import debug from 'debug';

const log = debug('app:routes:login:page.server');

export const actions: Actions = {
	async default(event) {
		const data = await event.request.formData();
		const username = data.get('username') as string;
		const password = data.get('password') as string;

		const resp = await auth.login({
			username,
			password,
			opts: { cookies: event.cookies }
		});

		if (resp.isErr()) {
			const error = (
				String(resp.error) ?? 'No account with that username could be found.'
			).trim();
			return fail(401, { username, error });
		}

		const user = resp.value;

		log('user:', user);

		if (user && user.token) {
			event.cookies.set('auth_token', `${user.id}:${user.token}`, {
				path: '/',
				maxAge: AUTH_TOKEN_EXPIRY_SECONDS
			});
		}

		log('redirecting user...');

		delete user.token;

		return { user };
	}
};
