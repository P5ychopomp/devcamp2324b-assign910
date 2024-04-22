import { env } from '$env/dynamic/private';

export const seed_user: User = {
	id: 0,
	username: 'upcsi',
	password: env.PASSWORD,
	token: ''
};