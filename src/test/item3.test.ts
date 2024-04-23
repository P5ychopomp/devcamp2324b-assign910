import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import Dashboard from '../routes/(authenticated)/dashboard/+page.svelte';

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