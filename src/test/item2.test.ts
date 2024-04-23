import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';
import { expect, it } from 'vitest';
import Dashboard from '../routes/(authenticated)/dashboard/+page.svelte';

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